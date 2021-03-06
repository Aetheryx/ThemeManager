// This element is basically a modified SettingsOptionToggle with my own 'Edit snippet' and 'Delete snippet' buttons added in.

const e = window.DI.React.createElement;
const Base = window.DI.require('Structures/Components/SettingsOptionBase.js');
const { SettingsOptionButton } = window.DI.require('Structures/Components/');

class SettingsOptionToggle extends Base {
    constructor (props) {
        super(props);
        this.state = {
            checked: this.getProp()
        };
    }

    getProp () {
        return this.props.plugin.snippets.find(snippet => snippet.name === this.props.title).enabled;
    }

    setProp (arg) {
        const snippetName = this.props.title;
        const settings = JSON.parse(this.props.plugin.getSettingsNode('snippets'));
        settings.find(snippet => snippet.name === snippetName).enabled = arg;
        this.props.plugin.setSettingsNode('snippets', JSON.stringify(settings));
    }

    click () {
        this.setProp(!this.getProp());
        this.setState(() => ({
            checked: this.getProp()
        }));
        this.props.plugin.toggleSnippet(this.props.title);
    }

    render () {
        const extra = this.props.extra || [];
        return e('div', {
            className: 'flex-lFgbSz flex-3B1Tl4 vertical-3X17r5 flex-3B1Tl4 directionColumn-2h-LPR justifyStart-2yIZo0 alignStretch-1hwxMa noWrap-v6g9vO margin-top-20 margin-bottom-20',
            style: {
                flex: '1 1 auto'
            }
        },
            e('div', {
                className: 'flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyStart-2yIZo0 alignStart-pnSyE6 noWrap-v6g9vO',
                style: {
                    flex: '1 1 auto'
                }
            },
                e('h3', {
                    className: 'h3-gDcP8B title-1pmpPr size16-3IvaX_ height24-2pMcnc weightMedium-13x9Y8 defaultColor-v22dK1 title-3i-5G_ marginReset-3hwONl flexChild-1KGW5q',
                    style: {
                        flex: '1 1 auto'
                    }
                }, `${this.props.title}`),
                e(SettingsOptionButton, {
                    text: 'Delete Snippet',
                    onClick: () => {
                        if (this.props.plugin.snippets.find(s => s.name === this.props.title).enabled) {
                            this.click.bind(this)();
                        }
                        this.props.plugin.deleteSnippet(this.props.title);
                        this.props.onDelete();
                    }
                }),
                e(SettingsOptionButton, {
                    text: 'Edit Snippet',
                    onClick: this.props.onEdit
                }),
                e('div', {
                    className: 'flexChild-1KGW5q switchEnabled-3CPlLV switch-3lyafC value-kmHGfs sizeDefault-rZbSBU size-yI1KRe themeDefault-3M0dJU ' // eslint-disable-line prefer-template
                    + (this.state.checked ? 'valueChecked-3Bzkbm' : 'valueUnchecked-XR6AOk'),
                    onClick: this.click.bind(this),
                    style: {
                        flex: '0 0 auto'
                    }
                },
                    e('input', {
                        type: 'checkbox',
                        className: 'checkbox-1KYsPm checkboxEnabled-4QfryV checkbox-1KYsPm',
                        value: this.state.checked ? 'on' : 'off'
                    }),
                    e('div', {
                        className: `switch-3lyafC ${this.state.checked ? 'checked-7qfgSb' : ''}`
                    })
                )
            )
        , ...extra);
    }
}

module.exports = SettingsOptionToggle;