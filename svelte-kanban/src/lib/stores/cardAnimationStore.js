import { writable } from 'svelte/store';

/**
 * @type {import("svelte/store").Writable<boolean>} animateAddCard;
 */
export const animateAddCard = writable(false);

/**
 * starts the animation for when adding a new todo card
 * @param {number} duration - milliseconds
 */
export function playAddCardAnimation(duration) {
	animateAddCard.set(true);
	const clearTimeout = setTimeout(() => {
		animateAddCard.set(false);
	}, duration);
}

/**
 * ceates a animationToggle boolean that you can use to play an animation
 * set the duration of the animation in (ms)
 * boolean will flip false -> true -> false again after a duration in (ms)
 * @function playAnimation
 * @returns {{animateToggle: boolean, playAnimation: (duration: number = 500) => void}} - playAnimation function
 */
export function createAnimation() {
	let animateToggle = false;
	return {
		animateToggle,
		playAnimation(duration = 500) {
			animateToggle = true;
			const clearTimeout = setTimeout(() => {
				animateToggle = false;
			}, duration);
		}
	};
}
