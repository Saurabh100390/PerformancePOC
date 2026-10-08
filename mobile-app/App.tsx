import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Post = { id: number; title: string; body: string };
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'api' | 'list'>('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPosts = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('API request failed');
      setPosts(await response.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (screen === 'api' || screen === 'list') loadPosts();
  }, [screen, loadPosts]);

  const visiblePosts = useMemo(() => posts.slice(0, 30), [posts]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Performance POC</Text>
        <Text style={styles.subtitle}>Mobile performance practice app</Text>
      </View>
      <View style={styles.content}>
        {screen === 'home' && <>
          <Text style={styles.heading}>Performance Lab</Text>
          <Text style={styles.description}>Practice launch time, API latency, loading states, scrolling/FPS, rendering and resource monitoring.</Text>
          <Button title="API Performance" onPress={() => setScreen('api')} />
          <Button title="List / Scroll Test" onPress={() => setScreen('list')} />
        </>}
        {screen === 'api' && <>
          <Text style={styles.heading}>API Performance</Text>
          <Text style={styles.description}>GET {API_URL}</Text>
          {loading && <ActivityIndicator size="large" />}
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {!loading && !error && posts.length > 0 && <View style={styles.card}><Text style={styles.metric}>{posts.length}</Text><Text>records received</Text></View>}
          <Button title="Refresh API" onPress={loadPosts} />
          <Button title="Back" onPress={() => setScreen('home')} secondary />
        </>}
        {screen === 'list' && <>
          <Text style={styles.heading}>Scroll / Rendering Test</Text>
          {loading ? <ActivityIndicator size="large" /> : <FlatList
            data={visiblePosts}
            keyExtractor={(item) => String(item.id)}
            initialNumToRender={10}
            renderItem={({ item }) => <View style={styles.listItem}><Text style={styles.itemTitle}>{item.id}. {item.title}</Text><Text numberOfLines={2}>{item.body}</Text></View>}
          />}
          <Button title="Back" onPress={() => setScreen('home')} secondary />
        </>}
      </View>
    </SafeAreaView>
  );
}

function Button({title, onPress, secondary = false}: {title: string; onPress: () => void; secondary?: boolean}) {
  return <Pressable onPress={onPress} style={[styles.button, secondary && styles.secondaryButton]}><Text style={[styles.buttonText, secondary && styles.secondaryButtonText]}>{title}</Text></Pressable>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa' },
  header: { padding: 24, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { marginTop: 4, color: '#667085' },
  content: { flex: 1, padding: 24, gap: 14 },
  heading: { fontSize: 22, fontWeight: '700' },
  description: { fontSize: 16, lineHeight: 24, color: '#475467' },
  button: { padding: 15, borderRadius: 10, backgroundColor: '#111827', marginTop: 8 },
  secondaryButton: { backgroundColor: '#e5e7eb' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
  secondaryButtonText: { color: '#111827' },
  error: { color: '#b42318' },
  card: { padding: 24, borderRadius: 12, backgroundColor: 'white', alignItems: 'center' },
  metric: { fontSize: 40, fontWeight: '700' },
  listItem: { backgroundColor: 'white', padding: 14, marginBottom: 8, borderRadius: 10 },
  itemTitle: { fontWeight: '700', marginBottom: 6 }
});
