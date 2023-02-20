import Tooltip from "@ckeditor/ckeditor5-ui/src/tooltip/tooltipview";
import Icon from "@ckeditor/ckeditor5-core/theme/icons/pencil.svg";

export default class TooltipView extends Tooltip {
  constructor(locale) {
    super(locale);
    this.set({
      icon: Icon,
    });
  }

  render() {
    super.render();
    this._element.setAttribute("role", "tooltip");
    this._element.setAttribute("id", "custom-tooltip");
  }
}
