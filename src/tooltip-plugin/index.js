import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import pencil from "@ckeditor/ckeditor5-core/theme/icons/pencil.svg";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import Dialog from "@ckeditor/ckeditor5-ui/src/dialog/dialog";

class TooltipDialog extends Dialog {
  constructor(locale) {
    super(locale);

    this.set("title", "Enter Tooltip Text");
  }

  render() {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Tooltip text");

    this.body.appendChild(input);
  }
}
export default class ToolTip extends Plugin {
  static get pluginName() {
    return "Tooltip";
  }
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("tooltip", (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: "Tooltip",
        icon: pencil,
        tooltip: true,
      });
      // Callback executed once the image is clicked.
      view.on("execute", () => {
        const dialog = new TooltipDialog(locale);
        editor.ui.dialog.open(dialog, {
          toolbar: [],
          onClose: () => {
            const inputTooltipText = dialog.body.querySelector("input").value;
            editor.model.change((writer) => {
              const link = writer.createText(inputTooltipText, {
                linkHref: "#bayut-content-tooltip",
              });
              // Insert the link in the current selection location.
              editor.model.insertContent(link, editor.model.document.selection);
            });
          },
        });
      });

      return view;
    });
  }
}
