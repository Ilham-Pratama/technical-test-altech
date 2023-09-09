import React, {useEffect, useState} from 'react';
import {Text, Button, Searchbar, List, Snackbar} from 'react-native-paper';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import useDebounce from '../utils/useDebounce';
import {Post, RootStackParamList} from '../utils/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const TheCounter = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(count => count + 1);
  const decrement = () => setCounter(count => count - 1);

  return (
    <View style={styles.counterContainer}>
      <Button onPress={decrement} mode="contained" uppercase>
        Decrement -
      </Button>
      <Text>Counter: {counter}</Text>
      <Button onPress={increment} mode="contained" uppercase>
        Increment +
      </Button>
    </View>
  );
};

function HomeScreen({navigation}: HomeScreenProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=20${
        debouncedSearch ? `&title_like=${debouncedSearch}` : ''
      }`,
    )
      .then(res => res.json())
      .then((res: Post[]) => {
        if (!(typeof res?.length === 'number')) {
          throw new Error();
        }
        setPosts(res);
      })
      .catch(() => setSnackbarVisible(true))
      .finally(() => setLoading(false));
  }, [debouncedSearch]);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const onPostPress = (post: Post) => {
    navigation.push('Details', post);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Text variant="bodyLarge" style={styles.centerText}>
          Loading data...
        </Text>
      );
    }
    if (!posts.length) {
      return (
        <Text variant="bodyLarge" style={styles.centerText}>
          Data not found
        </Text>
      );
    }
    return (
      <ScrollView>
        {posts.map(post => {
          return (
            <List.Item
              key={post.id}
              title={post.title}
              onPress={() => onPostPress(post)}
            />
          );
        })}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <TheCounter />
      <View>
        <Searchbar
          placeholder="Search Post"
          value={search}
          onChangeText={text => setSearch(text)}
        />
        {renderContent()}
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: onDismissSnackBar,
        }}>
        An unexpected error occured.
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 25,
    flex: 1,
    backgroundColor: '#FFF',
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  centerText: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
