import './App.css';
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { paperSave, loadCode } from './actions'
import { useDispatch } from 'react-redux'
import { Form, Segment, Grid, Modal, Button, Input } from 'semantic-ui-react'
import { StarsTemplate, Circuit, Diversity, StarsCalc, Draw } from './containers'
import { Coder, WindowSizer, CostCalc } from './containers'

const regex = /V2-[0-9]{5}-[0-9]{5}-[0-9a-z]{4}-[0-9a-z]{4}/i;

const CodeModal = (props) => {
  const [open, setOpen] = React.useState(false)
  const [code, updateCode] = React.useState("")

  const get_clipboard = () => {
    navigator.clipboard.readText().then(text => {
      // console.log(text.trim().toUpperCase().match(regex))
      let match = text.trim().toUpperCase().match(regex)
      if (match) {
        updateCode(match[0])
      }
    })
    .catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
  }

  return (
    <Modal
      onClose={() => {setOpen(false); updateCode('')}}
      onOpen={() => {setOpen(true); get_clipboard()}}
      open={open}
      size='mini'
      trigger={props.trigger}
    >
      <Modal.Header>Insert Code</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Input fluid placeholder='Code...' value={code} onChange={(e, {value}) => updateCode(value)} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Ok"
          labelPosition='right'
          icon='checkmark'
          onClick={() => {props.onCodeLoad(code); setOpen(false); updateCode('')}}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
  
}

const FormFull = (props) => {
  const dispatch = useDispatch()

  return (
      <Form>
        <StarsTemplate />
        
        <Circuit
          label="Circuit&nbsp;1"
          primary={true}
          state_key="ckt_1"
        />
        <Circuit
          label="Circuit&nbsp;2"
          primary={false}
          state_key="ckt_2"
        />
        
        <Diversity />
        
        <Form.Group widths='equal'>
          <Form.Button
            onClick={() => dispatch(paperSave())}
          >
            Save
          </Form.Button>
          <CodeModal 
            trigger={<Form.Button>Load</Form.Button>}
            onCodeLoad={(code) => dispatch(loadCode(code))}
          />
        </Form.Group>
      </Form>
    )
}

const App = () => {
  return (
    <div className="App">
      <Grid columns='equal'>
        <Grid.Row name="header">
          <div/>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1}>
            <div/>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment>
              <FormFull/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment style={{overflow: 'auto', maxWidth: 900 }}>
              <Draw/>
              <CostCalc/>
              <br/>
              <br/>
              <StarsCalc/>
              <br/>
              <br/>
              <Coder/>
              <br/>
              <Segment size="small">
                <p>The cost and availability rating is indicative and for guidance only.</p>
                <p>Availability and cost vary per location. Drawing a design in this tool doesn't mean it can actually be built or sold.</p>
              </Segment>
              <br/>
              <WindowSizer/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <div/>
        </Grid.Row>
      </Grid>
      
      
    </div>
  );
}


export default App;
