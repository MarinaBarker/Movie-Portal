export interface UserFavorite {
    name: string;
    favorites: string[];
  }
  
  export function loginUser(name: string, password: string) {
    localStorage.setItem('currentUser', JSON.stringify({ name, password }));
  }
  
  export function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
  
  export const clearCurrentUser = () => {
    localStorage.removeItem('currentUser');
  };
  
  export function isUserInUserList(name: string) {
    const userList = getUserList();
    if (userList) {
      const user = userList.find((user: UserFavorite) => user.name === name);
      return user;
    }
    return null;
  }
  
  export function getUserList() {
    const userList = localStorage.getItem('userList');
    if (userList) {
      const list = JSON.parse(userList);
      return list;
    } else {
      return null;
    }
  }
  
  export function regInUserList(name: string, password: string) {
    const isUserReg = isUserInUserList(name);
    if (!isUserReg) {
      const userList = getUserList();
      const newUser = { name, favorites: [] };
      if (userList) {
        localStorage.setItem('userList', JSON.stringify([...userList, newUser]));
      } else {
        localStorage.setItem('userList', JSON.stringify([newUser]));
      }
      loginUser(name, password);
    }
    return null;
  }
  
  export function hasInFavorite(name: string, id: string) {
    const isUserInList = isUserInUserList(name);
    if (isUserInList) {
      return isUserInList.favorites.findIndex((movieId: string) => movieId === id) !== -1 ? false : true;
    }
    return false;
  }
  
  export function changeFavoriteList(name: string, id: string, state: boolean) {
    const userList = getUserList();
    const isUserInList = isUserInUserList(name);
  
    if (userList && isUserInList && !hasInFavorite(name, id)) {
      if (state) {
        isUserInList.favorites.push(id);
      } else {
        isUserInList.favorites = isUserInList.favorites.filter((movieId: string) => movieId !== id);
      }
      const changedUserList = userList?.map((user: UserFavorite) =>
        user.name === name ? isUserInList : user,
      );
      localStorage.setItem('userList', JSON.stringify(changedUserList));
    }
  }