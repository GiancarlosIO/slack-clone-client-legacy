import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Button,
  Form,
  Grid,
  Message,
} from 'semantic-ui-react';

const FormTemplate = ({
  header,
  subHeader,
  fields,
  error,
  errorHeader,
  errorContent,
  errorList,
  gridProps,
  onSubmit,
  loading,
  buttonLabel,
  buttonProps,
  gridColumnWidth,
}) => (
  <Container>
    <Grid padding centered {...gridProps}>
      <Grid.Column width={gridColumnWidth}>
        <Header as="h2">
          {header}
        </Header>
        {subHeader ? (
          <p>
            {subHeader}
          </p>
        ) : null}
        <Form
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        >
          {fields.map((f, i) => (
            <Form.Input
              key={f.id || i}
              {...f}
            />
          ))}
          {error && (
            <Message
              error
              header={errorHeader}
              content={errorContent}
              list={errorList}
            />
          )}
          <Button type="submit" {...buttonProps}>
            {buttonLabel}
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  </Container>
);

FormTemplate.defaultProps = {
  gridProps: {},
  subHeader: null,
  buttonProps: {},
};

FormTemplate.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disable: PropTypes.string.isRequired,
    fluid: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  error: PropTypes.bool.isRequired,
  errorHeader: PropTypes.string.isRequired,
  errorContent: PropTypes.string.isRequired,
  errorList: PropTypes.arrayOf(PropTypes.string).isRequired,
  gridProps: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonProps: PropTypes.shape({}),
  gridColumnWidth: PropTypes.number.isRequired,
};

export default FormTemplate;
