# Firebase Firestore Security Rules

Copy these rules to your Firebase Console (Firestore Database → Rules):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
    }

    // Stories collection
    match /stories/{storyId} {
      allow write: if request.resource.data.size() < 100000; // 100KB limit
      allow update: if true; // Allow likes/comment counts
    }

    // Frustration posts
    match /frustration/{postId} {
      allow write: if request.resource.data.size() < 100000;
    }

    // Confessions
    match /confessions/{confessionId} {
      allow write: if request.resource.data.size() < 50000; // 50KB limit
    }

    // Chat messages
    match /chat/{messageId} {
      allow write: if request.resource.data.size() < 10000; // 10KB limit
      // Auto-delete messages older than 24 hours (you can set up a Cloud Function for this)
    }
  }
}
```

## How to Apply:

1. Go to **Firebase Console** → https://console.firebase.google.com/
2. Select your project
3. Click **Firestore Database** in the left menu
4. Click the **Rules** tab
5. Replace the existing rules with the rules above
6. Click **Publish**
