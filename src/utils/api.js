function getStoryDetails(id) {
  const endPoint = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  
  return (
    fetch(endPoint)
    .then(res => res.json())
    .then(story => {
      if(!story) {
        throw new Error(`error fetching story id: ${id}`)
      }

      return story;
    })
  )
}

export function getStories(type) {
  const endPoint = `https://hacker-news.firebaseio.com/v0/${type.toLowerCase()}stories.json`;

  return (
    fetch(endPoint)
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          throw new Error(data.error)
        }

        return Promise.all(data.map(storyId => getStoryDetails(storyId)))
      })
  )
}

export function getUser(username) {
  const endPoint = `https://hacker-news.firebaseio.com/v0/user/${username}`;

  return (
    fetch(endPoint)
      .then(res => res.json())
      .then(data => {
        if(!data) {
          throw new Error(`${username} does not exist!`);
        }

        return data;
      })
  )
}