export function getPostDetails(id) {
  const endPoint = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  
  return (
    fetch(endPoint)
    .then(res => res.json())
    .then(post => {
      if(!post) {
        throw new Error(`error fetching story id: ${id}`)
      }

      return post;
    })
  )
}

export function getPosts(type) {
  const endPoint = `https://hacker-news.firebaseio.com/v0/${type.toLowerCase()}stories.json`;

  return (
    fetch(endPoint)
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          throw new Error(data.error)
        }

        return data;
      })
  )
}

export function createMarkup(innerHtml) {
  return {
    "__html": innerHtml
  }
}

export function getUser(username) {
  const endPoint = `https://hacker-news.firebaseio.com/v0/user/${username}.json`;

  return (
    fetch(endPoint)
      .then(res => res.json())
      .then(user => {
        if(!user) {
          throw new Error(`${username} does not exist!`);
        }

        return user;
      })
  )
}