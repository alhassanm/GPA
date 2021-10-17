let i = $('#table-courses').length;
$('#calculate').click(function (event) {
  const { target } = event;
  sumError = 0;
  try {
    const inputs = target.parentElement.previousElementSibling.children;
    
    let course = [];
    if (inputs.length > 0) {
      sumError++;
      for (const i of inputs) {
        let obj = {};
        for (const j of i.children) {
          for (const k of j.children) {
            let targetValue = +k.value;
            if (
              k.classList.contains('credit') &&
              (targetValue > 15 || targetValue < 0)
            ) {
              throw 'Credit must greater than 0 and less than 15 ';
            } else if (k.classList.contains('credit') && targetValue != '') {
              obj.credit = targetValue;
            } else if (k.classList.contains('gpa') && targetValue != '-1') {
              obj.grade = targetValue;
            } else if ( 
              (k.classList.contains('credit') && targetValue == '') ||
              (k.classList.contains('gpa') && targetValue == '-1')
            ) {
              throw 'Some fields is empty';
            }
          }
        }
        course.push(obj);
      }
      calculate(course);
    } 
    console.log(Object.keys(calTotal()).length === 2);
    if(Object.keys(calTotal()).length === 2){
      sumError++;
      calculate(course);

    }
    if(sumError === 0) {
       throw 'Must add course';
    }
  } catch (e) {
    console.log(e);
    $('.alert-danger').text(e).removeClass('invisible').fadeIn();
    setTimeout(() => {
      $('.alert-danger').addClass('invisible');
      $('#show-gpa').fadeOut();
    }, 3000);
  }
});

function calTotal() {
  let obj = {};

  let sumError = 0
  $('#total div').each((index, elem) => {
    try {
      const input = elem.children[1];

      if (
        input.id === 'total-points' && typeof input.value === 'string' && input.value != ''
      ) {
        sumError++;
        let parse = +input.value
        if (parse) 
          obj.totalPoint = +input.value;
        else 
          throw 'Must textbox is number';
      } else if (
        input.id === 'total-credit' &&
        typeof input.value === 'string' &&
        input.value != ''
      ) {
        sumError++;
        let parse = +input.value
        if (parse) 
          obj.totalCredit = +input.value;
        else 
          throw 'Must textbox is number';
      }
    } catch(e) {
      console.log(e);
      $(`#${elem.children[1].id}`).css({
        border: '1px solid #f00',
      });
      setTimeout(() => {
        $('#show-gpa').fadeOut();
        $(`#${elem.children[1].id}`).css({
          border: '1px solid #CED4DA',
        });
      }, 3000);
    }
  });
  return obj;
}

function calculate(course) {
  let points = 0;
  let totalCredit = 0;

  if(course.length > 0){
    for (const item of course) {
      if(item.grade !== -5){
        points += item.grade * item.credit;
        totalCredit += item.credit;
      }
    }
  }
  const objCalcTotal = calTotal();
  if(objCalcTotal){
    if('totalPoint' in objCalcTotal && 'totalCredit' in objCalcTotal){
      points += objCalcTotal.totalPoint;
      totalCredit += objCalcTotal.totalCredit;
    }
  }
  innerHtml(points, totalCredit);
}

function innerHtml(points, totalCredit) {
  let gpa = (points / totalCredit).toFixed(2);
  try {
    if (gpa >= 0 && gpa <= 4) {
      $('#gpa').text(gpa);
      $('#show-gpa').removeClass('d-none').fadeIn();
      changeBorderColor(gpa);
    } else {
      throw 'GPA must be between 0 and 4';
    }
  } catch (e) {
    $('.alert-danger').text(e).removeClass('invisible').fadeIn();
    setTimeout(() => {
      $('.alert-danger').addClass('invisible');
      $('#show-gpa').fadeOut();
    }, 3000);
  }
}

function changeBorderColor(gpa) {
  if (gpa >= 3.75 && gpa < 4) {
    $('#circle').css({
      borderColor: '#1e88e5',
    });
  } else if (gpa >= 3.5 && gpa > 3.75) {
    $('#circle').css({
      borderColor: 'rgb(36,130,119)',
    });
  } else if (gpa >= 3.0 && gpa < 3.5) {
    $('#circle').css({
      borderColor: '#1ce9d0',
    });
  } else if (gpa >= 2.5 && gpa < 3.0) {
    $('#circle').css({
      borderColor: '#fb8500',
    });
  } else if (gpa >= 2.0 && gpa < 2.5) {
    $('#circle').css({
      borderColor: '#ffb703',
    });
  } else if (gpa >= 1.5 && gpa < 2.0) {
    $('#circle').css({
      borderColor: '#e5383b',
    });
  } else if (gpa >= 1 && gpa < 1.5) {
    $('#circle').css({
      borderColor: '#e5383b',
    });
  }
}

$('#add-course').click(function () {
  if (i <= 7) {
    let pushRow = `
    <div class="row mt-3 d-flex justify-content-around">
      <div class="col-4">
        <input type="text" class="form-control p-1">
      </div>
      <div class="col-2">
        <input type="number" class="credit form-control p-1 text-center" required>
      </div>
      <div class="col-2">
        <select class="gpa form-control" required>
          <option value="-1">choose</option>
          <option value="4">A+</option>
          <option value="3.75">A</option>
          <option value="3.5">B+</option>
          <option value="3">B</option>
          <option value="2.5">C+</option>
          <option value="2">C</option>
          <option value="1.5">D+</option>
          <option value="1">D</option>
          <option value="0">F</option>
          <option value="-5">W</option>
        </select>
      </div>
      <div class="col-1">
       <button class="remove btn btn-outline-danger">X</button>
     </div>
    </div>
`;
    i++;
    append(pushRow);
  } else {
    alert('you cannot add more than 7 courses');
  }
});

function append(pushRow) {
  $('#table-courses').append(pushRow);
}

$('body').click(function (event) {
  const { target } = event;
  if (target.classList.contains('remove')) {
    target.parentElement.parentElement.remove();
    $('#show-gpa').hide();
    i--;
  }
});
