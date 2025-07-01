import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function AnnouncementsPage() {
  const styles = {
    layout: {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      fontFamily: 'sans-serif',
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#f5f6fa',
      overflow: 'hidden',
    },
    pageBody: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2f3640',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#2f3640',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    card: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '4px',
      color: '#1a1a1a',
    },
    cardDate: {
      fontSize: '12px',
      color: '#222',
      marginBottom: '6px',
    },
    cardDesc: {
      fontSize: '14px',
      color: '#1a1a1a',
    },
  };

  const dummyAnnouncements = [
    {
      id: 1,
      title: 'New HR Policy Released',
      date: '2025-06-22',
      description: 'Please read the updated HR policy document shared via email.',
      comments: [],
      reactions: {},
    },
    {
      id: 2,
      title: 'Office Closed on July 15',
      date: '2025-06-24',
      description: 'Due to a scheduled maintenance activity, the office will remain closed.',
      comments: [],
      reactions: {},
    },
  ];

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState(dummyAnnouncements);
  const [newPost, setNewPost] = useState('');

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    const newEntry = {
      id: Date.now(),
      title: newPost,
      date: new Date().toISOString().split('T')[0],
      description: '',
      comments: [],
      reactions: {},
    };
    setPosts([newEntry, ...posts]);
    setNewPost('');
  };

  function PostCard({ post, posts, setPosts }) {
    const [comment, setComment] = useState('');
    const [reactions, setReactions] = useState(post.reactions || {});
    const [showReactions, setShowReactions] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleComment = () => {
      if (!comment.trim()) return;
      const updatedPosts = posts.map(p => p.id === post.id
        ? { ...p, comments: [...(p.comments || []), { text: comment, date: new Date().toLocaleString() }] }
        : p
      );
      setPosts(updatedPosts);
      setComment('');
    };

    const handleReaction = (emoji) => {
      const updatedReactions = {
        ...reactions,
        [emoji]: (reactions[emoji] || 0) + 1,
      };
      setReactions(updatedReactions);

      const updatedPosts = posts.map(p => p.id === post.id
        ? { ...p, reactions: updatedReactions }
        : p
      );
      setPosts(updatedPosts);
    };

    return (
      <div style={styles.card}>
        <div style={styles.cardTitle}>{post.title}</div>
        <div style={styles.cardDate}>📅 {post.date}</div>
        <div style={styles.cardDesc}>{post.description}</div>

        {/* Toggle buttons for reactions and comments */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button onClick={() => setShowReactions(!showReactions)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>😊</button>
          <button onClick={() => setShowComments(!showComments)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>💬</button>
        </div>

        {/* Reactions section, toggled */}
        {showReactions && (
          <div style={{ marginTop: '8px', fontSize: '18px', transition: 'all 0.3s ease' }}>
            {['👍','❤️','😂','😮','👎'].map((emoji) => (
              <button key={emoji} onClick={() => handleReaction(emoji)} style={{ marginRight: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'black' }}>
                {emoji} {reactions[emoji] || ''}
              </button>
            ))}
          </div>
        )}

        {/* Comments section, toggled */}
        {showComments && (
          <div style={{ marginTop: '12px', transition: 'all 0.3s ease' }}>
            {post.comments?.map((c, idx) => (
              <div key={idx} style={{ fontSize: '13px', marginBottom: '6px', paddingLeft: '10px', borderLeft: '2px solid #ddd', color: '#1a1a1a' }}>
                🗨 {c.text} 
                <div style={{ fontSize: '11px', color: '#999' }}>
                  ({c.date}) &nbsp; | &nbsp;
                  👍 0 &nbsp; | &nbsp; 💬 0
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', marginTop: '8px', gap: '8px' }}>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                style={{ flex: 1, padding: '6px', fontSize: '13px', color: '#1a1a1a', backgroundColor: '#fff' }}
              />
              <button onClick={handleComment} style={{ padding: '6px 12px', backgroundColor: '#2f3640', color: '#fff', border: 'none', borderRadius: '4px' }}>Reply</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>
          <div style={styles.headerRow}>
            <h2 style={styles.title}>Announcements</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                resize: 'none',
                fontSize: '14px',
                color: '#1a1a1a',
                backgroundColor: '#fff'
              }}
            />
            <button style={styles.button} onClick={handleCreatePost}>Post</button>
          </div>

          <div style={styles.list}>
            {posts.map((a) => (
              <PostCard key={a.id} post={a} setPosts={setPosts} posts={posts} />
            ))}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 998,
          }}
        />
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />
    </div>
  );
}

export default AnnouncementsPage;
