<!-- V-1.2.1-->

let i = $('#table-courses').length;
$('.alert-danger').hide();
$('#show-gpa').hide();

$('#calculate').click(function (event) {
  const {target} = event;
  try {
    const inputs = target.parentElement.previousElementSibling.children;
    let course = [];
    if (inputs.length > 0) {
      for (const i of inputs) {
        let obj = {};
        for (const j of i.children) {
          for (const k of j.children) {
            let targetValue = +k.value;
            if (k.classList.contains('credit') && (targetValue > 15 || targetValue < 0)) {
              throw 'Credit must greater than 0 and less than 15 ';
            } else if (k.classList.contains('credit') && targetValue != '') {
              obj.credit = targetValue;
            } else if (k.classList.contains('gpa') && targetValue != '-1') {
              obj.grade = targetValue;
            } else if ((k.classList.contains('credit') && targetValue == '') || (k.classList.contains('gpa') && targetValue == '-1')) {
              throw 'Some fields is empty';
            }
          }
        }
        course.push(obj)
      }
      calculate(course);
    } else {
      throw 'Must add course';
    }
  } catch (e) {
    $('.alert-danger').text(e).fadeIn();
    setTimeout(() => {
      $('.alert-danger').fadeOut();
      $('#show-gpa').fadeOut();

    }, 3000)
  }
})

function calculate(course) {
  let points = 0;
  let totalCredit = 0;
  for (const item of course) {
    points += (item.grade * item.credit)
    totalCredit += item.credit;
  }
  innerHtml(points, totalCredit);
}

function innerHtml(points, totalCredit) {
  let gpa = (points / totalCredit).toFixed(2)
  try {
    if (gpa >= 0 && gpa <= 4) {
      $('#gpa').text(gpa)
      $('#show-gpa').show()
      changeBorderColor(gpa)
    } else {
      throw 'GPA must be between 0 and 4';
    }
  } catch (e) {
    $('.alert-danger').text(e).fadeIn();
    setTimeout(() => {
      $('.alert-danger').fadeOut();
      $('#show-gpa').fadeOut();
    }, 3000)
  }
}

function changeBorderColor(gpa) {
  if (gpa >= 3.75 && gpa < 4) {
    $('#circle').css({
      borderColor: '#1e88e5'
    })
  } else if (gpa >= 3.5 && gpa > 3.75) {
    $('#circle').css({
      borderColor: 'rgb(36,130,119)'
    })
  } else if (gpa >= 3.00 && gpa < 3.5) {
    $('#circle').css({
      borderColor: '#1ce9d0'
    })
  } else if (gpa >= 2.5 && gpa < 3.00) {
    $('#circle').css({
      borderColor: '#fb8500'
    })
  } else if (gpa >= 2.00 && gpa < 2.5) {
    $('#circle').css({
      borderColor: '#ffb703'
    })
  } else if (gpa >= 1.5 && gpa < 2.00) {
    $('#circle').css({
      borderColor: '#e5383b'
    })
  } else if (gpa >= 1 && gpa < 1.5) {
    $('#circle').css({
      borderColor: '#e5383b'
    })
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
        <select class="gpa form-select" required>
          <option value="-1">choose</option>
          <option value="4">A+</option>
          <option value="3.75">A</option>
          <option value="3.5">B+</option>
          <option value="3">B</option>
          <option value="2.5">C+</option>
          <option value="2">C</option>
          <option value="1.5">D+</option>
          <option value="1">D</option>
        </select>
      </div>
      <div class="col-1">
       <button class="remove btn btn-outline-danger">X</button>
     </div>
    </div>
`;
    i++;
    append(pushRow)
  } else {
    alert('you cannot add more than 7 courses')
  }
})

function append(pushRow) {
  $('#table-courses').append(pushRow)
}


$('body').click(function (event) {
  const {target} = event;
  if (target.classList.contains('remove')) {
    target.parentElement.parentElement.remove()
    $('#show-gpa').hide();
    i--;
  }
})