# React Native & Authentication Quiz - Study Guide

## Quick Reference for Your Project

### 1. **Context API Pattern** (For Your AuthContext)
```javascript
// ✅ CORRECT: Provide context at app root
<AuthProvider>
  <NavigationContainer>
    <App />
  </NavigationContainer>
</AuthProvider>

// ❌ WRONG: Recreating context on every render
const ctx = createContext(); // Inside render function
```

### 2. **Token Management Strategy**
```
APP STARTUP
    ↓
Check AsyncStorage for token
    ↓
If exists → Restore user (show loading)
    ↓
If valid → Show App Stack
If expired/invalid → Show Auth Stack
If new app → Show Auth Stack
```

### 3. **AuthContext Best Practice**
```javascript
const [user, setUser] = useState(null);      // ✅ User data
const [token, setToken] = useState(null);    // ✅ JWT token
const [isLoading, setIsLoading] = useState(false); // ✅ Loading state

// ❌ DON'T store sensitive data in state only
// ✅ DO persist tokens to AsyncStorage after login
```

### 4. **Security Checklist for Your Project**
- [ ] Tokens stored in AsyncStorage (not just state)
- [ ] No tokens logged to console in production
- [ ] API requests include token in headers
- [ ] Token refresh endpoint implemented in backend
- [ ] Logout clears both state and storage
- [ ] Password never stored locally

### 5. **Common Mistakes to Avoid**
| ❌ WRONG | ✅ CORRECT |
|---------|-----------|
| `const [user, setUser] = useState(JsonFromAPI)` | Parse JSON, validate, then store |
| `fetch(url)` without error handling | Try/catch + proper error messages |
| Storing tokens in state only | AsyncStorage + state |
| Calling API in render function | useEffect with dependencies |
| No loading states | Show spinner/loader during requests |
| Lost session on app refresh | Restore from AsyncStorage on startup |

### 6. **Your Project's API Flow**
```
React Native App
    ↓
services/api.js ← (HTTP calls via fetch/axios)
    ↓
backend/ (PHP Login/Registration)
    ↓
db.sql ← (User data)
    ↓
Token returned to app
    ↓
Stored in AsyncStorage + AuthContext
    ↓
Used in headers for authenticated requests
```

### 7. **Navigation Pattern with Auth**
```javascript
// Render different nav stacks based on auth state
{token ? (
  <AppNavigator />  // Home, Products, Profile
) : (
  <AuthNavigator /> // Login, Registration
)}
```

### 8. **Key Hooks for Your App**
- `useState` - Local component state
- `useContext` - Access AuthContext (useContext(AuthContext))
- `useEffect` - Initialize app, restore token on startup
- `useFocusEffect` - Refresh data when screen focused

### 9. **Testing Your Implementation**
1. Test normal login → token saved?
2. Test app close + reopen → token restored?
3. Test logout → token and state cleared?
4. Test invalid credentials → error shown?
5. Test network error → proper error message?
6. Test expired token → auto-refresh or re-login?

### 10. **Your Next Steps**
1. ✅ Complete logout functionality
2. ⏳ Add token refresh mechanism
3. ⏳ Implement proper error handling
4. ⏳ Add splash screen during token restoration
5. ⏳ Test on real device
6. ⏳ Add unit tests for auth logic

---

## Score Your Quiz Above
Save your answers, score them with the rubric, then focus on weak areas using this guide!
