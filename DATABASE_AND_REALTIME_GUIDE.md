# 📞 Real-Time Signaling, Calls & Database Setup Guide for Haven

This document explains how **Haven Sanctuary** handles real-time peer communication, 1-on-1 voice calling, and whether you need a backend database when deploying to production.

---

## ⚡ 1. How Real-Time Calls & Messaging Work Out-of-the-Box (Zero Database Required)

Haven includes a **Serverless P2P WebRTC & Broadcast Network Engine** built directly into the client code.

### What is enabled right now:
- **Serverless Peer Signaling**: Uses browser P2P state synchronization, `BroadcastChannel`, and `StorageEvent` triggers.
- **Cross-Window & Cross-Tab Live Calls**: Opening Haven in multiple tabs, windows, or browsers on any deployed domain (e.g. Vercel) will allow users to call each other live!
- **Procedural Apple iOS Ringtone & Call Animation**: Plays real-time Web Audio Marimba ringtones and displays full-screen iOS call overlays without needing any external audio assets.
- **Cost**: **$0.00 / month forever**.

---

## 🗄️ 2. Do You Need a Database for Global Multi-User Deployment?

### Short Answer:
- **For Testing, Demo, and Small Groups**: **NO Database Needed!** The built-in P2P network allows users on your deployed Vercel URL to message each other, release lanterns, blend orbs, and make 1-on-1 voice calls immediately.
- **For Large Global Scale (Thousands of Users across different networks)**: A database or WebSocket signaling server can be added to store persistent user accounts across devices.

---

## 🚀 3. Optional Free Database Options for Global Scale

If you ever want to add persistent global accounts and cross-country NAT traversal:

### Option A: Firebase Realtime Database (Recommended - 100% Free)
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new free project named `haven-wellness`.
3. Enable **Realtime Database** in test mode.
4. Copy your `firebaseConfig` object and paste it into Haven.
- **Cost**: **$0.00 / month** (Includes 1GB storage & 10GB monthly bandwidth).

### Option B: Supabase Realtime (PostgreSQL - 100% Free)
1. Go to [Supabase](https://supabase.com/).
2. Create a project and enable Realtime Broadcast channels.
- **Cost**: **$0.00 / month** (Includes 500MB database & 200 concurrent real-time connections).

---

## ✅ Summary Recommendation
Deploy your app now to **Vercel**! Your users will be able to sign up with the 3-question survey, add friends, receive live Apple-style incoming calls with ringtones, and talk in real-time immediately with zero setup required.
