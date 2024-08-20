import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Text, TextInput, Modal, Button } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import YoutubePlayer from 'react-native-youtube-iframe';

const { height } = Dimensions.get('window');

const initialReelsData = [
  { id: '1', videoUrl: 'Ilu5ei_Mbbc', type: 'youtube', likes: 0, comments: [] },
  { id: '2', videoUrl: '_1GRjRH9tKA', type: 'youtube', likes: 0, comments: [] },
  { id: '3', videoUrl: 'https://instagram.fdel1-1.fna.fbcdn.net/v/t50.2886-16/131265170_226065939114926_2060867850971860273_n.mp4', type: 'video', likes: 0, comments: [] },
  { id: '4', videoUrl: 'https://scontent.fdel1-1.fna.fbcdn.net/v/t39.30808-6/272800381_101587892598084_1356409704804413466_n.mp4', type: 'video', likes: 0, comments: [] },
];

const FirstPage = () => {
  const [reelsData, setReelsData] = useState(initialReelsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const addLike = (reelId) => {
    setReelsData((prevData) =>
      prevData.map((reel) =>
        reel.id === reelId ? { ...reel, likes: reel.likes + 1 } : reel
      )
    );
  };

  const addComment = (reelId) => {
    setReelsData((prevData) =>
      prevData.map((reel) =>
        reel.id === reelId ? { ...reel, comments: [...reel.comments, newComment] } : reel
      )
    );
    setNewComment('');
    setCommentModalVisible(false);
  };

  const openCommentModal = (comments) => {
    setCurrentComments(comments);
    setCommentModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <View style={{ height, justifyContent: 'center' }}>
      {item.type === 'youtube' ? (
        <YoutubePlayer
          height={300}
          play={currentIndex === index}
          videoId={item.videoUrl}
          onChangeState={(state) => console.log(state)}
        />
      ) : (
        <VideoPlayer
          video={{ uri: item.videoUrl }}
          videoWidth={Dimensions.get('window').width}
          videoHeight={height}
          ref={(ref) => (videoRefs.current[index] = ref)}
          autoplay={currentIndex === index}
          loop
          resizeMode="cover"
          disableFullscreen={true}
        />
      )}
      {/* Like and Comment Buttons */}
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 100, right: 20 }}
        onPress={() => addLike(item.id)}
      >
        <Text style={{ color: 'white' }}>{item.likes} Likes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 60, right: 20 }}
        onPress={() => openCommentModal(item.comments)}
      >
        <Text style={{ color: 'white' }}>Comments</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={reelsData}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      <Modal
        visible={commentModalVisible}
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={{ flex: 1, padding: 16 }}>
          <FlatList
            data={currentComments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Add a comment"
            style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
          />
          <Button title="Submit" onPress={() => addComment(reelsData[currentIndex].id)} />
          <Button title="Close" onPress={() => setCommentModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default FirstPage;
