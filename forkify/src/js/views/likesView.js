import { elements } from './base';

export const toggleLikesBtn = (isLiked) => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document
    .querySelector('.recipe__love use')
    .setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikesMenu = (numLikes) => {
  elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};
