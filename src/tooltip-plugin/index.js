import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import pencil from "@ckeditor/ckeditor5-core/theme/icons/pencil.svg";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import DialogView from "@ckeditor/ckeditor5-ui/src/dialog/dialogview";

export default class ToolTip extends Plugin {
  static get pluginName() {
    return "ToolTip";
  }

  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("ToolTip", (locale) => {
      const view = new ButtonView(locale);
      const dialog = new DialogView(locale);

      view.set({
        label: "ToolTip",
        icon: pencil,
        tooltip: true,
      });

      dialog.setTemplate({
        // The dialog template.
        tag: "form",

        children: [
          {
            tag: "input",
            type: "text",
            id: "tooltipText",
            label: [
              {
                text: "ToolTip Text",
              },
            ],
          },
          {
            tag: "button",
            type: "submit",
            label: "Insert",
            class: "ck-button-save",
          },
        ],

        onSubmit: (evt) => {
          evt.preventDefault();
          const inputTooltipText = dialog.getChildViews()[0].element.value;
          editor.model.change((writer) => {
            const tooltip = writer.createText(inputTooltipText, {
              tooltip: "#bayut-content-tooltip",
            });
            editor.model.insertContent(
              tooltip,
              editor.model.document.selection
            );
          });
          dialog.hide();
        },
      });

      view.on("execute", () => {
        dialog.show();
      });

      return view;
    });
  }
}
