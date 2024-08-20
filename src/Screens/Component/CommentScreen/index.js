import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const CommentScreen = ({ route }) => {
  const { comments, addComment } = route.params;
  const [newComment, setNewComment] = useState('');

  const submitComment = () => {
    addComment(newComment);
    setNewComment('');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Add a comment"
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />
      <Button title="Submit" onPress={submitComment} />
    </View>
  );
};

const ReelsScreen = () => {
  // Add state for reels data
  const [reelsData, setReelsData] = useState([
    { id: '1', videoUrl: 'https://path_to_video1.mp4', likes: 0, comments: [] },
    { id: '2', videoUrl: 'https://path_to_video2.mp4', likes: 0, comments: [] },
  ]);

  const addComment = (reelId, comment) => {
    setReelsData((prevData) =>
      prevData.map((reel) =>
        reel.id === reelId ? { ...reel, comments: [...reel.comments, comment] } : reel
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={{ height: '100%', justifyContent: 'center' }}>
      {/* Video component and other UI */}
      <TouchableOpacity onPress={() => addLike(item.id)}>
        <Text>{item.likes} Likes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToComments(item.id)}>
        <Text>Comments</Text>
      </TouchableOpacity>
    </View>
  );

  // return (
  //   // FlatList component to display reels
  // );
};

export default CommentScreen;
