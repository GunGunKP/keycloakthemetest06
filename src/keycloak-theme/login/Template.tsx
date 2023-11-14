// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";


export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
            `${url.resourcesPath}/css/login.css`,
            `${url.resourcesCommonPath}/lib/zocial/materialize.min.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": getClassName("kcBodyClass")
    });

    if (!isReady) {
        return null;
    }

    return (
        <div className="container_12">
             <div className="grid_4 suffix_8">
                <a className="logo"></a>
            </div>
        
          <div className="box clear-float" >
            <div className="grid_3">
                <div className="product-logo"></div>
            </div>
            <div className="grid_9 left-seperator">
                <div className="box-content clear-float">
                <div className="row">
                {/*------------------- TOP LOGO ------------------*/}
                <div className="col  s12 right-align">
	                {/*<span class="chip" style="border: #666666 1px solid; background-color: #F9F9F9; color: #666666">TH/EN</span>*/}&nbsp;
                </div>
            <div className="col s12" >
		        <div className="col m1 l3 hide-on-small-only">
			        &nbsp;
		        </div>
		        <div className="center-align col s12 m10 l6" >
					<img src="https://nidp.su.ac.th/nidp/SU2/sulogo.svg" style={{width: "20%"}}/>
                    <br/>
					<h2 className="su_greentext" style={{color: "#00cb90",marginTop: "5px",marginBottom: "0px",fontSize:"5rem"}}>
                        <b>SU-NET</b>
                    </h2>
					<h5 className="grey-text text-lighten-2" >Single Sign On (SSO)</h5>
					<br/>
				</div>
		        <div className="col m1 l3 hide-on-small-only">
			        &nbsp;
		        </div>
	        </div>

            <div>
                <header className={getClassName("kcFormHeaderClass")} > 
                    {/*realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
                        <div id="kc-locale" style={{display: "flex",justifyContent: "center",alignItems:"flex-end",flexDirection:"column"}}>
                            <div id="kc-locale-wrapper" className={getClassName("kcLocaleWrapperClass")}>
                                <div className="kc-dropdown" id="kc-locale-dropdown">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    {/*</header><a href="#" id="kc-current-locale-link">
                                        {labelBySupportedLanguageTag[currentLanguageTag]}
                                    </a>
                                    <ul>
                                        {locale.supported.map(({ languageTag }) => (
                                            <li key={languageTag} className="kc-dropdown-item">
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                {/*<a href="#" onClick={() => changeLocale(languageTag)}>
                                                    {labelBySupportedLanguageTag[languageTag]}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                                        )*/}
                    {/*!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                        displayRequiredFields ? (
                            <div className={getClassName("kcContentWrapperClass")}>
                                <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                    <span className="subtitle">
                                        <span className="required">*xxxxxxxxxxx</span>
                                        {msg("requiredFields")}
                                    </span>
                                </div>
                                <div >
                                <h1 id="kc-page-title">{headerNode}</h1>
                                </div>
                            </div>
                        ) : (
                            <h1 id="kc-page-title">{headerNode}</h1>
                        )
                    ) : displayRequiredFields ? (
                        <div className={getClassName("kcContentWrapperClass")}>
                            <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                <span className="subtitle">
                                    <span className="required">xxxxxxxxxxxxxxxxxxxxxx</span> {msg("requiredFields")}
                                </span>
                            </div>
                            <div className="col-md-10">
                                {"showUsernameNode"}
                                <div className={getClassName("kcFormGroupClass")}>
                                    <div id="kc-username">
                                        <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                        <a id="reset-login" href={url.loginRestartFlowUrl}>
                                            <div className="kc-login-tooltip">
                                                <i className={getClassName("kcResetFlowIcon")}></i>
                                                <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {"showUsernameNode"}
                            <div className={getClassName("kcFormGroupClass")}>
                                <div id="kc-username">
                                    <label id="kc-attempted-username">{"attemptedUsername"}</label>
                                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                                        <div className="kc-login-tooltip">
                                            <i className={getClassName("kcResetFlowIcon")}></i>
                                            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </>
                    )*/}
                </header>
                <div id="kc-content">
                    <div id="kc-content-wrapper">
                        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div className={clsx("alert", `alert-${message.type}`)}>
                                {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                <span
                                    className="kc-feedback-text"
                                    dangerouslySetInnerHTML={{
                                        "__html": message.summary
                                    }}
                                />
                            </div>
                        )}
                        {children}
                        {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                            <form
                                id="kc-select-try-another-way-form"
                                action={url.loginAction}
                                method="post"
                                className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                            >
                                <div
                                    className={clsx(
                                        displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                                    )}
                                >
                                    <div className={getClassName("kcFormGroupClass")}>
                                        <input type="hidden" name="tryAnotherWay" value="on" />
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a
                                            href="#"
                                            id="try-another-way"
                                            onClick={() => {
                                                document.forms["kc-select-try-another-way-form" as never].submit();
                                                return false;
                                            }}
                                        >
                                            {msg("doTryAnotherWay")}
                                        </a>
                                    </div>
                                </div>
                            </form>
                        )}
                        {/*displayInfo && (
                            <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                    {infoNode}
                                </div>
                            </div>
                        )*/}
                    </div>
                </div>
            </div>

            <div className="footer alt-color" style={{display: "flex",justifyContent: "center"}}>
            <div className="grid_7 suffix_3">
                <p className="grey-text center-align" style={{fontSize: "0.8em"}}>
                    สำนักดิจิทัลเทคโนโลยี  มหาวิทยาลัยศิลปากร
                    <br/>
                    Bureau of Digital Technology, Silpakorn University
                    </p>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        
        </div>
    );
}
