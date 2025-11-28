# Self-Assessment

## 1. SignupPage.jsx Analysis

### Issue Identified
`SignupPage` contains repetitive field initialization, making the code harder to maintain.

```js
const nameInput = useField('text');
const emailInput = useField('text');
const passwordInput = useField('password');
const password2Input = useField('password');
// ... etc
```

### Improvement
Use a config-driven approach to reduce repetition:

```js
const fields = {
  name: useField("text"),
  email: useField("text"),
  password: useField("password"),
  password2: useField("password"),
  phone_number: useField("text"),
  gender: useField("text"),
  street: useField("text"),
  city: useField("text"),
  zipCode: useField("text"),
};

const {
  name, email, password, password2,
  phone_number, gender, street, city, zipCode
} = Object.fromEntries(
  Object.entries(fields).map(([k, v]) => [k, v.value])
);
```

---

## 2. useSignup.js Analysis

### Issues
- Contains outdated commented-out fetch code.
- Does not return structured success/error information.

### Improved Version

```js
try {
  const data = await execute({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  sessionStorage.setItem("user", JSON.stringify(data));
  setIsAuthenticated(true);
  navigate("/");

  return { success: true, data };
} catch (error) {
  toast.error(`Signup failed: ${error.message}`);
  return { success: false, error: error.message };
}
```

---

## 3. useFetch.js Analysis

### Issues
- Error parsing fails when server returns non-JSON responses.
- No abort controller for cleanup.
- useEffect runs even with `manual=true`.

### Improved Error Handling

```js
if (!response.ok) {
  let errorMessage = `Error: ${response.status}`;
  try {
    const errData = await response.json();
    errorMessage = errData.error || errorMessage;
  } catch (_) {}
  throw new Error(errorMessage);
}
```

### Optional AbortController

```js
const controller = new AbortController();
const signal = controller.signal;

useEffect(() => {
  return () => controller.abort();
}, []);
```

---

# Summary

| File | Improvement |
|------|-------------|
| SignupPage.jsx | Remove duplication using config-based fields |
| useSignup.js | Clean error handling & return structured result |
| useFetch.js | More robust error parsing & optional cleanup |

