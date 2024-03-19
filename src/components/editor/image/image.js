export default class SimpleImage {
  static get toolbox() {
    return {
      title: "Imagem",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" strokeWidth="2" rx="4"></rect><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M5.13968 15.32L8.69058 11.5661C9.02934 11.2036 9.48873 11 9.96774 11C10.4467 11 10.9061 11.2036 11.2449 11.5661L15.3871 16M13.5806 14.0664L15.0132 12.533C15.3519 12.1705 15.8113 11.9668 16.2903 11.9668C16.7693 11.9668 17.2287 12.1705 17.5675 12.533L18.841 13.9634"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M13.7778 9.33331H13.7867"></path></svg>',
    };
  }

  constructor({ data }) {
    this.data = data;
    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement("div");
    const input = document.createElement("input");

    if (this.data && this.data.url) {
      this._createImage(this.data.url, this.data.caption);
      return this.wrapper;
    }

    this.wrapper.classList.add("simple-image");
    this.wrapper.appendChild(input);

    input.placeholder = "Paste an image URL...";
    input.value = this.data && this.data.url ? this.data.url : "";

    input.addEventListener("paste", (event) => {
      this._createImage(event.clipboardData.getData("text"));
    });

    return this.wrapper;
  }

  _createImage(url, captionText) {
    const image = document.createElement("img");
    const caption = document.createElement("input");

    image.src = url;
    caption.placeholder = "Caption...";
    caption.value = captionText || "";

    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(image);
    this.wrapper.appendChild(caption);
  }

  save(blockContent) {
    const image = blockContent.querySelector("img");
    const caption = blockContent.querySelector("[contenteditable]");

    return {
      url: image.src,
      caption: caption.innerHTML || "",
    };
  }

  validate(savedData) {
    if (!savedData.url.trim()) {
      return false;
    }

    return true;
  }
}
