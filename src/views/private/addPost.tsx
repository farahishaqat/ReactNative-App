import { ActivityIndicator, Text, View } from "react-native"
import React, { useEffect, useRef } from 'react';

import CustomTextInput from '../../containers/customTextInput';
import { TouchableOpacity } from 'react-native';
import useAxios from 'axios-hooks';
import useCreatePost from '../../apis/createPost';

const AddPost = () => {
    const { createPostData, createPostError, createPostLoading, savePost } = useCreatePost();
    const formObj = useRef<{
        title: string,
        body: string,
        id: number,
        userId: number
    } | any>({});

    useEffect(() => {
        console.log('data ', createPostData);
        console.log('error', createPostError)
    }, [createPostData, createPostError])

    const handleValueChanged = (value: string, key: string) => {
        formObj.current[key] = value;
    }

    const submitPost = () => {
        formObj.current.id = new Date().getTime();
        formObj.current.userId = 4;
        savePost({
            data: formObj.current
        });
    }

    return (
        <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
            <Text>Create new post</Text>

            <CustomTextInput
                placeholder={'Title'}
                onchange={(text) => handleValueChanged(text, 'title')}
            />

            <CustomTextInput
                placeholder={'Body'}
                onchange={(text) => handleValueChanged(text, 'body')}
            />

            <TouchableOpacity style={{
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: 10,
                padding: 15
            }} onPress={submitPost}>
                <Text style={{
                    textAlign: 'center',
                    alignItems: 'center'
                }}>{!createPostLoading ? 'Create' : <ActivityIndicator />}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddPost
