import { BoxUnit } from "../../../atomic/unit/BoxUnit";
import { CustomUnit } from "../../../atomic/unit/Unit";
import { WindowParamContext } from "../../../context/WindowContext";
import { SectionBaseProps, SectionColumnCompose, SectionComposeProps, SectionRowCompose } from "../SceneSection";
import { SectionArticle, SectionArticleProps } from "./SectionArticle";
import { SectionButtonRow, SectionButtonRowProps } from "./SectionButtonRow";
import { SectionImageRow, SectionImageRowProps } from "./SectionImageRow";
import { SectionTitleAndSubTitle, SectionTitleAndSubTitleProps } from "./SectionTitleAndSubTitle";

export class SectionGeneric extends CustomUnit<SectionBaseProps> {
    static contextType = WindowParamContext;

    render() {
        let { sectionType } = this.props;

        if (sectionType === "SectionButtonRow") {
            return (
                <SectionButtonRow {...(this.props as SectionButtonRowProps)} />
            )
        }
        if (sectionType === "SectionImageRow") {
            return (
                <SectionImageRow {...(this.props as SectionImageRowProps)} />
            )
        }
        if (sectionType === "SectionTitleAndSubTitle") {
            return (
                <SectionTitleAndSubTitle {...(this.props as SectionTitleAndSubTitleProps)} />
            )
        }
        if (sectionType === "SectionRowCompose") {
            return (
                <SectionRowCompose {...(this.props as SectionComposeProps)} />
            )
        }
        if (sectionType === "SectionColumnCompose") {
            return (
                <SectionColumnCompose {...(this.props as SectionComposeProps)} />
            )
        }
        if (sectionType === "SectionArticle") {
            return (
                <SectionArticle {...(this.props as SectionArticleProps)} />
            )
        }
        return (
            <BoxUnit />
        )
    }
}