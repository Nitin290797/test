import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';

const { height } = Dimensions.get('window');

const reelsData = [
  { id: '1', videoUrl: 'https://path_to_video1.mp4', likes: 0, comments: [] },
  { id: '2', videoUrl: 'https://path_to_video2.mp4', likes: 0, comments: [] },
  // Add more video URLs here
];

const ReelsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const renderItem = ({ item, index }) => (
    <View style={{ height, justifyContent: 'center' }}>
      <Video
        source={{ uri: item.videoUrl }}
        style={{ height: '100%' }}
        resizeMode="cover"
        ref={(ref) => (videoRefs.current[index] = ref)}
        paused={currentIndex !== index}
        repeat
      />
      {/* Like and Comment Buttons */}
      <TouchableOpacity style={{ position: 'absolute', bottom: 100, right: 20 }}>
        <Text style={{ color: 'white' }}>{item.likes} Likes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ position: 'absolute', bottom: 60, right: 20 }}>
        <Text style={{ color: 'white' }}>Comments</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={reelsData}
      renderItem={renderItem}
      pagingEnabled
      keyExtractor={(item) => item.id}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
    />
  );
};

export default ReelsScreen;
