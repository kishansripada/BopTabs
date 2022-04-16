<template>
  <div
    class="container d-flex p-0 shadow-lg rounded-3 mt-4 position-relative"
    style="height: 200px"
  >
    <img
      src="https://i.scdn.co/image/ab6775700000ee85769926cc29d872eaec8dc953"
      class="m-3"
      style="border-radius: 10%; width: 100px; height: 100px"
      alt="..."
    />

    <p class="mt-4 mx-2">Kishan Sripada</p>
    <div
      class="ms-auto d-flex align-items-end flex-column mb-3"
      style="height: 200px"
    >
      <div class="p-3">2020-08-07</div>
      <div class="px-3">Flex item</div>
      <div class="dropdown mt-auto p-3">
        <a
          class="btn dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Choose Version
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><a class="dropdown-item" href="#">Version 1</a></li>
          <li><a class="dropdown-item" href="#">Version 2</a></li>
          <li><a class="dropdown-item" href="#">Version 3</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabInfo",
  computed: {},
};
</script>