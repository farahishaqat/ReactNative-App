import useAxios from 'axios-hooks';
import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useCreatePost from '../../apis/posts/createPost';
import CustomTextInput from '../../containers/customTextInput';
import SplashScreen from 'react-native-splash-screen';
//import ImagePicker from 'react-native-image-crop-picker';

const AddPost = () => {
  const {createPostData, createPostError, createPostLoading, savePost} =
    useCreatePost();
  const formObj = useRef<
    | {
        title: string;
        body: string;
        id: number;
        userId: number;
      }
    | any
  >({});

  useEffect(() => {
    console.log('data ', createPostData);
    console.log('error', createPostError);
  }, [createPostData, createPostError]);

  const handleValueChanged = (value: string, key: string) => {
    formObj.current[key] = value;
  };

  const submitPost = () => {
    formObj.current.id = new Date().getTime();
    formObj.current.userId = 4;
    savePost({
      data: formObj.current,
    });
    SplashScreen.hide();
  };

 const takePhotoFromCamera=()=>{
   console.log("")
    // ImagePicker.openCamera({
    //     width: 300,
    //     height: 400,
    //     cropping: true,
    //   }).then(image => {
    //     console.log(image);
    //   });
      

 }

  return (
    <View style={{marginHorizontal: 15, marginVertical: 15}}>
      <Text>Create new post</Text>

      <View style={styles.container}>
        <TouchableOpacity onPress={takePhotoFromCamera} style={styles.btnText}>
          <Text>Take Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnText}>
          <Text>Add image from Gallery</Text>
        </TouchableOpacity>
      </View>
      <Text>Clear image</Text>
      <CustomTextInput
        placeholder={'Title'}
        onchange={text => handleValueChanged(text, 'title')}
      />
      <CustomTextInput
        placeholder={'Body'}
        onchange={text => handleValueChanged(text, 'body')}
      />
      <TouchableOpacity style={styles.btn} onPress={submitPost}>
        <Text style={styles.btnText}>
          {!createPostLoading ? 'Create' : <ActivityIndicator />}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    justifyContent: 'center',
    display: 'flex',
    borderRadius: 10,
    borderStyle: 'dotted',
    borderWidth: 1,
    backgroundColor: '#eee',
  },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
  },
  btnText: {
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default AddPost;
