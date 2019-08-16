import PropTypes from 'prop-types';
import NeveColorPicker from '../common/NeveColorPicker.js';

const ALLOWED_MEDIA_TYPES = ['audio'];
const { __ } = wp.i18n;
const {
	Component,
	Fragment
} = wp.element;
const {
	MediaPlaceholder
} = wp.editor;

const {
	Button,
	ButtonGroup,
	RangeControl,
	FocalPointPicker,
	Dashicon,
	ToggleControl
} = wp.components;

class BackgroundComponent extends Component {
	constructor(props) {
		props.control.focus();
		super(props);
		let value = props.control.setting.get();
		this.state = {
			type: value.type || 'color',
			imageUrl: value.imageUrl || '',
			focusPoint: value.focusPoint || { x: 0.5, y: 0.5 },
			colorValue: value.colorValue || '',
			overlayColorValue: value.overlayColorValue || '',
			overlayOpacity: value.overlayOpacity || 50,
			fixed: value.fixed || false
		};
	}

	getButtons() {
		let types = ['color', 'image'],
			labels = { 'color': __('Color'), 'image': __('Image') },
			buttons = [],
			self = this;
		types.map(function (type) {
			buttons.push(
				<Button
					isPrimary={self.state.type === type}
					isDefault={self.state.type !== type}
					onClick={(e) => {
						self.setState({ type: type });
						self.updateSetting();
					}}
				>
					{labels[type]}
				</Button>);
		});

		return buttons;
	}

	render() {
		let self = this;
		return (
			<Fragment>
				<div className="control--top-toolbar">
					<ButtonGroup className="neve-background-type-control">
						{this.getButtons()}
					</ButtonGroup>
				</div>
				<div className="control--body">
					{this.state.type === 'color' &&
						<NeveColorPicker
							label={__('Background Color')}
							colorChangeCallback={(value) => {
								self.setState({ colorValue: value.hex });
								self.updateSetting();
							}}
							colorValue={this.state.colorValue} />
					}
					{this.state.type === 'image' &&
						<Fragment>
							{!this.state.imageUrl && <MediaPlaceholder
								icon="format-image"
								labels={{
									title: __('Image'),
									instructions: __('Select from the Media Library or upload a new image')
								}}
								onSelect={(imageData) => {
									this.setState({ imageUrl: imageData.url });
									this.updateSetting();
								}}
								allowedTypes={['image']}
							/> ||
								<Fragment>
									<Button
										className="remove-image"
										isDestructive
										isLink
										onClick={() => {
											this.setState({ imageUrl: '' });
											this.updateSetting();
										}}>
										<Dashicon icon="no" />
										Remove Image</Button>
									<FocalPointPicker
										url={this.state.imageUrl}
										value={this.state.focusPoint}
										onChange={(val) => {
											this.setState({ focusPoint: { x: val.x, y: val.y } });
											this.updateSetting();
										}} />
								</Fragment>}
							<ToggleControl
								label={__('Fixed Background')}
								checked={this.state.fixed}
								onChange={(fixed) => {
									this.setState({ fixed: fixed });
									this.updateSetting();
								}}
							/>
							<NeveColorPicker
								label={__('Overlay Color')}
								colorChangeCallback={(value) => {
									self.setState({ overlayColorValue: value.hex });
									self.updateSetting();
								}}
								colorValue={this.state.overlayColorValue} />
							<RangeControl
								label={__('Overlay Opacity')}
								value={this.state.overlayOpacity}
								onChange={(overlayOpacity) => {
									this.setState({ overlayOpacity });
									this.updateSetting();
								}}
								min="0"
								max="100"
							/>
						</Fragment>
					}
				</div>
			</Fragment>
		);
	}

	updateSetting() {
		setTimeout(() => {
			this.props.control.setting.set({
				type: this.state.type,
				imageUrl: this.state.imageUrl,
				focusPoint: this.state.focusPoint,
				colorValue: this.state.colorValue,
				overlayColorValue: this.state.overlayColorValue,
				overlayOpacity: this.state.overlayOpacity,
				fixed: this.state.fixed
			});
		}, 1);
	}
}

BackgroundComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default BackgroundComponent;
