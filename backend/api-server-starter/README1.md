# Explanation of the toJSON Schema Configuration

- In this project, the Mongoose jobSchema is configured with a custom toJSON transformation. This ensures that whenever a Job document is converted to JSON (for example, when sending it in an API response), the output is cleaned up and formatted in a more client-friendly way.

- jobSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
   });
# What this does:

- virtuals: true
    Enables virtual fields to appear in the JSON output. Virtuals are schema-defined computed properties that are not stored in MongoDB.

- Custom transform function
    The transform function runs every time a document is converted to JSON. It allows us to modify the output object (ret) before it is returned.

- ret.id = ret._id;
    Creates a friendlier id field that mirrors MongoDB’s internal _id field.

- delete ret._id;
    Removes the original _id field so clients only see id, which is more conventional in API design.

- delete ret.__v;
    Removes Mongoose’s version key (__v), which is internal metadata not needed by API consumers.