<template>
  <div class="panel panel-filled">
    <div class="panel-body">
      <div class="form-group">
        <label>First Name</label>
        <input type="text" class="form-control" placeholder="First Name" tabindex="0">
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" class="form-control" placeholder="Last Name" tabindex="0">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" placeholder="Email" tabindex="0">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstName: null,
      lastName: null,
      email: null,
    };
  },
  computed: {},
  methods: {},
  components: {},
};
</script>
