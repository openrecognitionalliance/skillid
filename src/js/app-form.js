export default {
  name: 'app-form',
  data: function () {
    return {
      title : "Form",
      websiteValue: "www.example.com",
      emailValue: "example@gmail.com",
      searchValue: "",
      searchResults: []
     }
   },
  methods: {
    submit: function (events) {
      console.log("submitted");
    },

    onChangeSearch: function () {
      let list = document.querySelector('.list');
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      if(this.searchValue.length > 3) {
        let fetched = fetch(`http://esp-api-dev-0.10.0.cogni.zone/search?text=${this.searchValue}&language=en&type=skill&facet=type&facet=isInScheme`, {
  	       method: 'get'
         })

         let promis = fetched.then(r => r.json())

         let resultsObject = promis.then(result => {
           if(result){
             result._embedded.results.forEach(r => this.addNewElement(r))
           }
         });
      }

    },

    addNewElement: function (r) {
      this.searchResults.push(r.title);
    },

    handleImage: function () {
      let input = document.getElementById('image-input');
      let file  = input.files[0];
      let img = new Image();
      var objectURL = URL.createObjectURL(file);
      img.src = objectURL;

      img.onload = () => {
        let sizes = {
          width:img.width,
          height: img.height
        };
        console.log(file.type.match('image.*'));
        if(sizes.width < 480 && sizes.height < 150){
          let confirmBox = confirm("Are you sure you want to continue?")
          if(confirmBox === true) {
            this.displayImage(file, img);
          }

        }else {
            this.displayImage(file, img);
        }
      };
    },

    displayImage: function (file, img) {
      let image = document.getElementById('image');
      image.file = file;
      let reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
      reader.readAsDataURL(file);
    }
  }

}