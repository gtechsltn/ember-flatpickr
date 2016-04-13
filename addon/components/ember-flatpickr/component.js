import flatpickr from 'npm:flatpickr';
import Ember from 'ember';
const {on, run, TextField} = Ember;

export default TextField.extend({
  attributeBindings: ['placeholder', 'value'],
  //Flatpickr options
  altFormat: 'F j, Y',
  altInput: false,
  dateFormat: 'Y-m-d',
  defaultDate: null,
  disable: null,
  enableTime: false,
  hourIncrement: 1,
  inline: false,
  maxDate: null,
  minDate: null,
  minuteIncrement: 5,
  shorthandCurrentMonth: false,
  timeFormat: 'H:i',
  value: null,
  /**
   * When the date is changed, update the value and send 'onChangeAction'
   * @param dateObject The selected date
   */
  onChange(dateObject) {
    if (typeof dateObject !== 'undefined') {
      this.set('value', dateObject);
      this.sendAction('onChangeAction', dateObject);
    }
  },
  /**
   * When the flatpickr is closed, fire the 'onCloseAction'
   */
  onClose() {
    this.sendAction('onCloseAction');
  },
  setupComponent: on('init', function() {
    run.scheduleOnce('afterRender', this, function() {
      flatpickr('#' + this.elementId, {
        altFormat: this.get('altFormat'),
        altInput: this.get('altInput'),
        dateFormat: this.get('dateFormat'),
        defaultDate: this.get('defaultDate'),
        disable: this.get('disable'),
        enableTime: this.get('enableTime'),
        hourIncrement: this.get('hourIncrement'),
        inline: this.get('inline'),
        maxDate: this.get('maxDate'),
        minDate: this.get('minDate'),
        minuteIncrement: this.get('minuteIncrement'),
        onChange: this.onChange.bind(this),
        onClose: this.onClose.bind(this),
        shorthandCurrentMonth: this.get('shorthandCurrentMonth'),
        timeFormat: this.get('timeFormat'),
        value: this.get('value')
      });
      if (this.get('appendDataInput')) {
        this.$().attr('data-input', '');
      }
    });
  })
});
