import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import Card from '../common/Card'
import Introduction from './Introduction'
import ShowPersonCardPreview from './ShowPersonCardPreview'
import PersonName from './PersonName'
import PersonLastSeen from './PersonLastSeen'
import PersonPhotos from './PersonPhotos'
import Done from './Done'
import addPersonService from '../../services/addPersonService'

export default class extends Component {
    constructor() {
        super()
        this.state = { step: addPersonService.step ? addPersonService.step : 0 }
    }
    componentDidMount() {
        if (!addPersonService.person) addPersonService.store({ photos: [] })
    }
    render() {
        let currentStep
        switch (this.state.step) {
            case 0:
                currentStep = <Introduction next={() => this.setState({ step: 1 })} />
                break
            case 1:
                currentStep = <ShowPersonCardPreview next={() => this.setState({ step: 2 })} back={() => this.setState({ step: 0 })} />
                break
            case 2:
                currentStep = <PersonName next={() => this.setState({ step: 3 })} back={() => this.setState({ step: 1 })} />
                break
            case 3:
                currentStep = <PersonLastSeen next={() => this.setState({ step: 4 })} back={() => this.setState({ step: 2 })} />
                break
            case 4:
                currentStep = <PersonPhotos next={() => this.setState({ step: 5 })} back={() => this.setState({ step: 3 })} done={() => this.setState({ step: 5 })} />
                break
            case 5:
                currentStep = <Done />
                break
            default:
                return null
        }
        return (
            <DocumentTitle title="NeedU - Novo incidente">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <div style={{ margin: 'auto', padding: 50 }}>
                        <Card imageStyle={{ display: 'none' }} style={{ height: 'auto', width: 500 }}>
                            <div style={{ padding: 50, display: 'flex', flexDirection: 'column' }}>
                                {currentStep}
                            </div>
                        </Card>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
}