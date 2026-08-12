<template>
	<button type="button" class="back-button" @click="$emit('click')">
		<icon-base class="back-button__icon">
			<icon-arrow/>
		</icon-base>
		Назад
	</button>
</template>

<script>
// icon
import IconBase from "./icons/IconBase.vue";
import IconArrow from "./icons/IconArrow.vue";

export default {
  name: "BackButton",
  components: {
		IconBase,
		IconArrow
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.back-button {
	display: flex;
	align-items: center;
	font-size: 12px;
	text-decoration: none;
	color: $text-color;
	padding: 10px;

	&__icon {
		width: 16px;
    height: 16px;
		margin-bottom: 0;
		color: black;
	}
}
</style>
