## Your Mission:

The "AllComments" company decided to start aggregating comments from different source that come in various data shapes. As a starting point your task is to create a comment component that will be displayed under a blog post and it should retrieve comments from reddit and twitter for a certain user. The component should be flexible enough to be used in other places on the platform as well and it can be displayed in various different design forms (list, stats, comment blog etc - design agnostic), where as the data will be still the same that will be required.

## Requirements:

1. We want to easily integrate new sources apart from twitter and reddit that might come in a different data format and will also be shown within any desired component
2. As a user I want to see the comments sorted based on created_at indicating: Author, content, source below a blog post (just add a dummy component). This comment component should be reusable and we could add it wherever we want (eg. Newsfeed a collection of all my comments).
3. We want to have functionality decoupled from design, so that we could technically retrieve, edit, delete comments from whereever we want and it is design agnostic

## Assumptions

1. We assum that user is loggedin and when fetching from various sources it will always return comments from this user (so dont worry about anything user related)
2. We assum that each source will return the data in different shapes and we need to normalize them
3. The platform differenciates between mobile and desktop view in all components and across the app
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
author: {
  first_name: string, // John
  last_name:string / Doe
},
created_at: DateTime,
twitter_content: string,
}
```

## Your task

Our intern has started to work on a `CommentBlogSection` component which is not quiet the way we want it yet. Hence we want you to refactor it and
come up with a solution based on the requirement presented above. In particulare with regards to:

- Architecture
- Types
- Performance
- Reusability

### Ides to get started with

1. Mock the data comming from the sources using the provided data format above (reddit and twitter) and make sure you factor in normalization of data. Make sure its easy to add any new source with a different data format.
2. Make sure the comment component for blog post can be visible when running `npm run start` and shows the desired information
3. Refactor the component `CommentBlogSection`in an optimized way so that it best fits the mission and requirements and optimal for perofrmance
4. Create a PR pointing to master and send link via email to `joerg@cantieridigitali.eu`
