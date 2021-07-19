const operateMixins = {
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {
      isLook(){
        return this.source=="detail";
      },
      isEdit(){
        return this.source=="edit";
      },
      isAdd(){
        return this.source=="add";
      }
    },
  };
  export default operateMixins;