import React, { useState } from 'react';
import { View, Button, Image, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

const UploadScreen = () => {
  const [video, setVideo] = useState(null);

  const selectVideo = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'video' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setVideo(response.assets[0]);
      }
    });
  };

  const uploadVideo = () => {
    // Handle video upload logic here
    // Add video to reelsData after upload
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Select Video" onPress={selectVideo} />
      {video && (
        <View>
          <Video
            source={{ uri: video.uri }}
            style={{ width: 300, height: 300 }}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={uploadVideo}>
            <Text>Upload Video</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UploadScreen;
