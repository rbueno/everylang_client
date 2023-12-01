import { isObject, isArray } from 'lodash'
import PropTypes from 'prop-types'
import { Card, Box, Typography, CardHeader } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const IdentSpace = ({ level }) => {
  if (level === 1) return <>&nbsp;&nbsp;&nbsp;&nbsp;- </>
  if (level === 2) return <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- </>
  if (level === 3) return <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- </>
  return <></>
}

const formatKeyAndValue = ({ key, value, isHead, indentationLevel }) => {
  if (isHead) return <p><IdentSpace level={indentationLevel} /> <strong>{key}:</strong></p>
  if (value === true) return <p><IdentSpace level={indentationLevel}/> <strong>{key}:</strong> Sim</p>
  if (value === false) return <p><IdentSpace level={indentationLevel}/> <strong>{key}:</strong> Não</p>
  if (value === null || value === undefined) return <p><IdentSpace level={indentationLevel}/> <strong>{key}:</strong> Não informado</p>
  return <p><IdentSpace level={indentationLevel}/> <strong>{key}:</strong> {value}</p>
}

const objectIndentation = (pipes, result = []) => {
  if (pipes.length < 1) return result

  const pipe = pipes.pop()

  const pipeData = pipe[0]
  const pipeIteration = pipe[1] > 0 ? pipe[1] : 0

  const pipeEntries = Object.entries(pipeData)
  for (let i = pipeIteration; i < pipeEntries.length; i +=1 ) {
    const [key, value] = pipeEntries[i]

    if (!isObject(value) && !isArray(value)) {
      result.push({ key, value, identLevel: pipes.length })
    }

    if (isObject(value) && !isArray(value)) {
      result.push({ isHead: true, key, value: null, identLevel: pipes.length })

      pipes.push([pipeData, i + 1], [value, 0])
      return objectIndentation(pipes, result)
    }

    if (isObject(value) && isArray(value)) {
      const isValidToConcat = (typeof value[0] === 'string' || typeof value[0] === 'number') && typeof value[0] !== 'object'
      
      if (isValidToConcat) {
        result.push({ key, value: value.join(', '), identLevel: pipes.length })
      }

      if (!isValidToConcat) {
        result.push({ isHead: true, key, value: null, identLevel: pipes.length })
        const valueArr = [] 
        value.forEach((item) => {
          if (isObject(item) && !isArray(item)) {
            valueArr.push([item, 0])
          }
        })
        
        pipes.push([pipeData, i + 1], ...valueArr)
        return objectIndentation(pipes, result)
      }
    }
   
  }
  
  return objectIndentation(pipes, result)
  
}

DealAllRawDetail.propTypes = {
  customerDetail: PropTypes.object
}

export default function DealAllRawDetail({ customerDetail}) {
  const originalData = customerDetail?.originDataSnapshots[0]
  const formattedData = { ...customerDetail}
  formattedData.id = formattedData._id
  delete formattedData._id
  delete formattedData.__v
  delete formattedData.products._id
  delete formattedData.latestAction.__v
  delete formattedData.latestAction._id
  delete formattedData.originDataSnapshots
  
    return (
        <Card sx={{ mt: 0, mb: 2 }}>
          <CardHeader title='Dados completos do deal' />
          <Box sx={{ m: 4 }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Formatados
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Dados reestruturados pelo Okahub</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box sx={{ m: 4 }}>
            {
              objectIndentation([[formattedData, 0]]).map((item) => formatKeyAndValue({ key: item.key, value: item.value, isHead: item.isHead, indentationLevel: item.identLevel }))
            }
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Originais
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Dados originais da forma como foram enviados ao Okahub</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box sx={{ m: 4 }}>
            {
              objectIndentation([[originalData, 0]]).map((item) => formatKeyAndValue({ key: item.key, value: item.value, isHead: item.isHead, indentationLevel: item.identLevel }))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
        
      </Card>
    )
}