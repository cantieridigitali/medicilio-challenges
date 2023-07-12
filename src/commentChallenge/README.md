## Your Mission:

The "AllComments" company decided to start aggregating comments from different source that come in various data shapes. As a starting point your task is to create a comment component that will be displayed under a blog post and it should retrieve comments from reddit and twitter for a certain user. The component should be flexible enough to be used in other places on the platform as well and it can be displayed in various different design forms (list, stats, comment blog etc - design agnostic), where as the data will be still the same that will be required.

## Component Requirements:

1. Reusable component to show comments wherever we want on the platform (Consideration that there will also be other design components that provides similar functionality but with a different shape)
2. Make sure to be able to provide the functionality around comments (retrieve, edit, delete) can also be leveraged in other design components on the platform
3. Have a simple component that will be below a blog post (no need to create any blogpost or page, only the component with very basic design)
4. Comments should be sorted by created_at within the blog post context

## Assumptions

1. We assum that user is loggedin and when fetching from various sources it will always return comments from this user
2. We assum that each source will return the data in different shapes and we need to normalize them
3. The platform differenciates between mobile and desktop view in all components
4. Assume the following data structure from reddit and twitter:

### Reddit

```json
{
author_full_name: string, // John Doe
created_at: DateTime,
content: string,
}
```

### Twitter

```json
{
author_first_name: string, // John
author_last_name: string // Doe
created_at: DateTime,
twitter_content: string,
}
```

## Your task

Currently the component is not exposed and is not connected to the App. We should change this and display something (in a way you like, function and architecture is more important then the actual design of the component).
Also the component should be improved based on the requirements mentioned earlier on in particular in regards to

- Architecture
- Types
- Performance
- Reusability

1. Mock the data comming from the sources using the provided data format above (reddit and twitter) and make sure you factor in normalization of data. Nothing complicated, nothing fancy here.
2. Make sure the comment component for blog post can be visible when running `npm run start`
3. Refactor the component `CommentBlogSection`in an optimized way so that it best fits the mission and requirements.
4. Create a PR pointing to master and send link via email to `joerg@cantieridigitali.eu`
