<template>
    <div class="pt-2 mb-4 form-group">
      <label for="textarea" class="mb-2 fs-20 fs-mob-18 medium-fw" v-if="label">
        {{label}}
      </label>
      <div class="normal-textarea program-info-popup-textarea">
        <div class="text-editor-icons">
          <div class="icons-wrapper">
            <!-- Font size -->
            <div>
              <select
                class="form-select size-select max-width-75"
                @change="formatDoc('fontsize', $event.target.value)"
              >
                <option value="0" selected>Size</option>
                <option value="1">1- Very Small</option>
                <option value="2">2- A Bit small</option>
                <option value="3">3- Normal</option>
                <option value="4">4- Medium Large</option>
                <option value="5">5- Big</option>
                <option value="6">6- Very Big</option>
                <option value="7">7- Maximum</option>
              </select>
            </div>
            <!-- Font size end-->
  
            <!-- Font line height -->
            <div v-if="lineHeight">
              <select
                class="form-select size-select"
                @change="formatDoc('lineheight', $event.target.value)"
              >
                <option value="0" selected>Line Height</option>
                <option value="1">1</option>
                <option value="1.25">1.25</option>
                <option value="1.5">1.5</option>
                <option value="1.75">1.75</option>
                <option value="2">Double</option>
              </select>
            </div>
            <!-- Font line height end-->
  
  
            <div>
              <ul class="flex nav flex-nowrap">
                <!-- font weight bold -->
                <li
                  class="nav-item"
                  :class="{ active: isFormatActive('bold') }"
                  @click="formatDoc('bold')"
                >
                  <button class="btn" type="button">
                    <img
                      src="@/assets/images/icons/bold.svg"
                      class="img-fluid"
                      alt="Text Editor Icon"
                    />
                  </button>
                </li>
                <!-- font weight bold end-->
                
                <!-- font italic -->
                <li
                  class="nav-item"
                  :class="{ active: isFormatActive('italic') }"
                  @click="formatDoc('italic')"
                >
                  <button class="btn" type="button">
                    <img
                      src="@/assets/images/icons/italic.svg"
                      class="img-fluid"
                      alt="Text Editor Icon"
                    />
                  </button>
                </li>
                <!-- font italic end -->
  
                <!-- font underline -->
                <li
                  class="nav-item"
                  :class="{ active: isFormatActive('underline') }"
                  @click="formatDoc('underline')"
                >
                  <button class="btn" type="button">
                    <img
                      src="@/assets/images/icons/underline.svg"
                      class="img-fluid"
                      alt="Text Editor Icon"
                    />
                  </button>
                </li>
                <!-- font underline end-->
  
                <!-- font strike -->
                <li
                  class="nav-item"
                  :class="{ active: isFormatActive('strikethrough') }"
                  @click="formatDoc('strikethrough')"
                >
                  <button class="btn" type="button">
                    <img
                      src="@/assets/images/icons/strike-through.svg"
                      class="img-fluid"
                      alt="Text Editor Icon"
                    />
                  </button>
                </li>
                <!-- font strike end-->
  
                <!-- font Highlight Color -->
                <li class="nav-item">
                  <button
                    class="btn text-editor-custom-dropdown"
                    type="button"
                    @click="toggleDropdown"
                  >
                    <img
                      src="@/assets/images/icons/background-color.svg"
                      class="img-fluid"
                      alt="Text Editor Icon"
                    />
                    <select
                      @change="formatDoc('backcolor', $event.target.value)"
                      class="text-editor-dropdown-list"
                      v-if="isOpen"
                    >
                      <option value="0" selected>Highlight Color</option>
                      <option value="white">White</option>
                      <option value="yellow">Yellow</option>
                      <option value="skyblue">Skyblue</option>
                      <option value="red">Red</option>
                      <option value="lightgreen">Light Green</option>
                      <option value="gray">Gray</option>
                    </select>
                  </button>
                </li>
                <!-- font Highlight Color end -->
              </ul>
            </div>
  
            <!-- text alignment -->
            <div>
              <ul class="flex nav alignment-nav extra flex-nowrap">
                <li
                  class="nav-item"
                  :class="{ active: isFormatActive('justifyleft') }"
                  @click="formatDoc('justifyleft')"
                >
                  <button class="btn" type="button">
                    <img
                      src="@/assets/images/icons/left-align.svg"
                      class="img-fluid"
                      alt="Text Editor Icon"
                    />
                  </button>
                </li>
                <li
                  class="nav-item"
                  :class="{ active: isFormatActive('justifycenter') }"
                  @click="formatDoc('justifycenter')"
                >
                  <button class="btn" type="button">
                    <img
                      src="@/assets/images/icons/center-align.svg"
                      class="img-fluid"
                      alt="Text Editor Icon"
                    />
                  </button>
                </li>
                <li
                  class="nav-item"
                  :class="{ active: isFormatActive('justifyright') }"
                  @click="formatDoc('justifyright')"
                >
                  <button class="btn" type="button">
                    <img
                      src="@/assets/images/icons/right-align.svg"
                      class="img-fluid"
                      alt="Text Editor Icon"
                    />
                  </button>
                </li>
              </ul>
            </div>
            <!-- text alignment end -->
  
          </div>
        </div>
        <!-- text area input -->
        <div
          :class="[
            'textarea-div',
            'autoHeight',
            'textEditorContentEditableDiv',
            { 'mh-110': mh === '110', 'mh-200': mh !== '110' },
          ]"
          contenteditable="true"
          :style="{ lineHeight: lineHeightValue }"
          @input="onInput"
          ref="editor"
          v-html="modelValue"
          v-once
        ></div>
        <input hidden type="hidden" :v-model="modelValue" id="textareaContent"/>
      </div>
      <!-- text area input -->
      
      <!-- error -->
      <div v-if="error">
        <label class="custom-error text-danger">{{ error }}</label>
      </div>
      <!-- error -->
      
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    props: {
      label: String,
      modelValue: String,
      lineHeight: String,
      mh: String,
      required: Boolean,
    },
    setup(props) {

    
    },
    data() {
      return {
        textEditorContent: "",
        lineHeightValue: "",
        isOpen: false,
      };
    },
    methods: {
      formatDoc(cmd, val) {
        this.activeAlignment = cmd;
        document.execCommand(cmd, false, val);
        this.$refs.editor.focus();
        if (cmd === "lineheight") {
          let allElements = this.$refs.editor.querySelectorAll("*");
          allElements.forEach((elem) => {
            elem.style.lineHeight = val;
          });
        }
      },
      isFormatActive(format) {
        return document.queryCommandState(format);
      },
      onInput(event) {
        this.textEditorContent = event.target.innerHTML;
      },
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
    },
    watch: {
      textEditorContent(newVal) {
        this.$emit("update:modelValue", newVal);
        this.lineHeightValue = "1.5";
      },
    },
  };
  </script>
  
<style scoped>
.normal-textarea {
    border: 2px solid #E8EDF8;
    border-radius: 14px;
    font-size: 1.125rem;
}

.normal-textarea.over {
    border-color: red;
}

.normal-textarea textarea {
    border: 0;
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
}

.normal-textarea textarea:focus {
    outline: 0;
}

.normal-textarea textarea::placeholder {
    color: rgba(0, 13, 61, 0.4);
}

.text-editor-icons {
   
}

.text-editor-icons .icons-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    padding: 0.65rem 1rem;
    background: #FFF;
    box-shadow: 0px 2.01027px 6.0308px rgba(0, 0, 0, 0.0417275), 0px 1.12694px 3.38082px rgba(0, 0, 0, 0.035), 0px 0.598509px 1.79553px rgba(0, 0, 0, 0.0282725), 0px 0.249053px 0.747159px rgba(0, 0, 0, 0.0196802);
    border-radius: 12px 12px 6px 6px;
    width: 100%;
}

.text-editor-icons .nav .nav-item {
    padding: 0;
    border-radius: 0.25rem;
    cursor: pointer;
    position: relative;
    margin-right: 0.125rem;
}

.text-editor-icons .nav .nav-item .btn {
    width: 35px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.text-editor-icons .nav .nav-item .btn img {
    flex-shrink: 0;
}

.text-editor-icons .nav .nav-item.active {
    background-color: rgba(219, 227, 245, 0.75);
}

.text-editor-icons .nav .nav-item:hover {
    background-color: rgba(232, 237, 248, 0.75);
}

.text-editor-icons .nav .nav-item[data-bs-original-title=Highlight], .text-editor-icons .nav .nav-item[title=Highlight] {
    pointer-events: none;
}

.text-editor-icons .nav .nav-item[data-bs-original-title=Highlight] select, .text-editor-icons .nav .nav-item[title=Highlight] select {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    pointer-events: all;
    opacity: 0;
}

.text-editor-icons .alignment-nav {
    gap: 0.25rem;
}

.textarea-div {
    padding: 1rem;
}

.textarea-div:focus {
    outline: none;
}

[data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: var(--common-text-clr);
    opacity: 0.4;
}

.invite-textarea-div {
    min-height: 240px;
    padding: 1.5rem 1.5rem 3rem;
}

.invite-textarea-div.white-bg {
    background-color: #fff;
    border: 0;
    border-radius: 0.875rem;
}

.invite-textarea-div:focus {
    outline: none;
}

.invite-textarea-div[data-placeholder]:empty:before {
    font-weight: var(--semi-bold-fw);
    color: var(--common-text-clr);
    opacity: 0.4;
}

.mh-200 {
    min-height: 200px;
}

.mh-110 {
    min-height: 110px;
}

.size-select {
    background: url("@/images/icons/chevron-black.svg");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    border: 0;
    padding: 0.15rem 1.5rem 0.15rem 0.75rem;
    font-size: 1.125rem;
}

.autoHeight {
    word-break: break-word;
}

.real-program-link {
    text-decoration: none;
    font-size: 1rem;
    margin-left: 0.5rem;
}

/* Notication Ends */
</style>