<?php
/**
 * Template used for component rendering wrapper.
 *
 * Name:    Header Footer Grid
 *
 * @version 1.0.0
 * @package HFG
 */
namespace HFG;

use HFG\Core\Builder\Header as HeaderBuilder;

$row_index  = current_row();
$control_id = get_builders()->get_property( 'control_id' );

$skin_mode = get_theme_mod( $control_id . '_' . $row_index . '_skin', 'dark-mode' );
$classes   = [ 'header-menu-sidebar', 'menu-sidebar-panel', $skin_mode ];

?>
<div id="header-menu-sidebar" class="<?php echo esc_attr( join( ' ', $classes ) ); ?>">
	<div id="header-menu-sidebar-bg" class="header-menu-sidebar-bg">
		<div id="header-menu-sidebar-inner" class="header-menu-sidebar-inner">
			<?php render_components( HeaderBuilder::BUILDER_NAME ); ?>
		</div>
	</div>
</div>

