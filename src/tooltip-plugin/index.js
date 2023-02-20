import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import TooltipView from "@ckeditor/ckeditor5-ui/src/tooltip/tooltipview";

export default class CustomTooltipPlugin extends Plugin {
  static get requires() {
    return [TooltipView];
  }

  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("customTooltip", (locale) => {
      const view = new TooltipView(locale);
      view.set({
        id: "custom-tooltip",
        content: "This is a custom tooltip",
        target: editor.editing.view.domConverter.mapViewToDom(
          editor.editing.view.document.selection.focus
        ),
        visible: true,
      });

      return view;
    });
  }
}
