# Self-Assessment -- User API (Hoang)

In this sprint, my primary backend responsibility was building and
improving the **User API**, including user registration, login, password
hashing with bcrypt, JWT authentication, input validation, and proper
error handling.

------------------------------------------------------------------------

## Example 1 -- Enhancing the `registerUser` Function

Initially, the registration logic only stored user data directly into
the database. I improved it by adding critical features such as:

-   Validating required fields
-   Checking for duplicate email addresses
-   Hashing passwords using bcrypt
-   Generating JWT tokens after registration

``` js
const registerUser = async (req, res) => {
  const { name, email, password, phone_number, gender, address } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phone_number ||
    !gender ||
    !address ||
    !address.street ||
    !address.city ||
    !address.zipCode
  ) {
    return res.status(400).json({ error: "Please fill in all required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      gender,
      address,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        gender: user.gender,
        address: user.address,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
```

### What I learned

-   How to hash passwords securely with bcrypt.
-   How to create JWT tokens for user authentication.
-   The importance of validating user input to help prevent frontend
    errors and improve overall API reliability.

------------------------------------------------------------------------

## Example 2 -- Improving `loginUser` With Secure Authentication

The login feature originally worked but lacked robust validation and
error responses. I updated it to include:

-   Input validation
-   Email existence checks
-   Password comparison using `bcrypt.compare`
-   Returning JWT tokens along with user information

``` js
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        gender: user.gender,
        address: user.address,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
```

### What I learned

-   How user authentication works using bcrypt and JWT.
-   The importance of proper HTTP status codes such as 400, 401, and
    500.
-   Creating consistent API responses to help the frontend work more
    efficiently.

------------------------------------------------------------------------

## Example 3 -- Designing a Clear and Structured User Model

I refined the User model to separate required fields clearly, structure
the address as a nested object, and remove the version key for cleaner
documents.

``` js
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    gender: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
  },
  { timestamps: true, versionKey: false }
);
```

### What I learned

-   How to design schemas that prevent missing or malformed data.
-   The benefits of using `timestamps` to track creation and
    modification.
-   Why `unique: true` does not replace manual validation in
    controllers.

------------------------------------------------------------------------

If needed, I can rewrite this with a more formal tone, include
challenges faced, or add a summary section.
