// src/screens/FeedScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const posts = [
    { id: '1', content: 'This is the first post!' },
    { id: '2', content: 'This is the second post!' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  post: {
    padding: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default HomeScreen;
