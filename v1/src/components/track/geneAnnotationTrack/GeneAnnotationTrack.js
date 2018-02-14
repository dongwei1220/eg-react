import React from 'react';

import AnnotationArranger from './AnnotationArranger';
import GeneDetail from './GeneDetail';
import { VISUALIZER_PROP_TYPES } from '../Track';

import { GeneFormatter } from '../../../model/Gene';
import LinearDrawingModel from '../../../model/LinearDrawingModel';
import BedSource from '../../../dataSources/BedSource';
import Tooltip from '../Tooltip';

const HEIGHT = 105;

/**
 * A gene annotation visualizer.
 * 
 * @author Silas Hsu
 */
class GeneAnnotationVisualizer extends React.PureComponent {
    static propTypes = VISUALIZER_PROP_TYPES;

    constructor(props) {
        super(props);
        this.state = {
            tooltip: null
        };
        this.openTooltip = this.openTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
    }

    /**
     * Called when a gene annotation is clicked.  Sets state so a detail box is displayed.
     * 
     * @param {MouseEvent} event 
     * @param {Gene} gene 
     */
    openTooltip(event, gene) {
        const tooltip = (
            <Tooltip relativeTo={document.body} x={event.pageX} y={event.pageY} onClose={this.closeTooltip} >
                <GeneDetail gene={gene} />
            </Tooltip>
        );
        this.setState({tooltip: tooltip});
    }
    
    closeTooltip() {
        this.setState({tooltip: null});
    }

    render() {
        const svgStyle = {marginTop: 5, display: "block", overflow: "visible"};
        const drawModel = new LinearDrawingModel(this.props.viewRegion, this.props.width);
        return (
        <React.Fragment>
            <svg width={this.props.width} height={HEIGHT} style={svgStyle} >
                <AnnotationArranger
                    data={this.props.data}
                    drawModel={drawModel}
                    onGeneClick={this.openTooltip}
                />
            </svg>
            {this.state.tooltip}
        </React.Fragment>
        );
    }
}

const GeneAnnotationTrack = {
    getDataSource: (trackModel) => new BedSource(trackModel.url, new GeneFormatter()),
    visualizer: GeneAnnotationVisualizer
};

export default GeneAnnotationTrack;
