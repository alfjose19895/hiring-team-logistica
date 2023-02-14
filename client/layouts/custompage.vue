<template>
  <div id="page">
    <slot name="app-before" />
    <div id="app-before"></div>
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <PageNavbar />
      </slot>
      <div
        class="bgstylized flex-1 w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      >
        <div class="flex flex-col mx-auto max-w-8xl w-full h-full">
          <slot />
        </div>
      </div>

      <slot name="footer">
        <PageFooter />
      </slot>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>

<style scoped>
#page {
  -webkit-user-select: none; /* For Safari */
  -moz-user-select: none; /* For Firefox */
  -ms-user-select: none; /* For Internet Explorer */
  user-select: none; /* For standard browsers */
}

.bgstylized {
  background-image: url(../assets/images/app-bg.png);
}
</style>
