let i = 1;
$('.alert-danger').hide();
$('#show-gpa').hide();

$('#calculate').click(function (event) {
  const {target} = event;
  try {
    const inputs = target.parentElement.previousElementSibling.children;
    let course = [];
    if (inputs.length) {

      for (const i of inputs) {
        let obj = {};
        for (const j of i.children) {
          for (const k of j.children) {
            if (k.classList.contains('credit') && k.value != '') {
              obj.credit = +k.value
            } else if (k.classList.contains('gpa') && k.value != '-1') {
              obj.grade = +k.value
            } else if ((k.classList.contains('credit') && k.value == '') || (k.classList.contains('gpa') && k.value == '-1')) {
              console.log((k.classList.contains('credit') && k.value == ''), (k.classList.contains('gpa') && k.value == '-1'))
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
  console.log(points / totalCredit)
  let gpa = (points / totalCredit).toFixed(2)
  $('#gpa').text(gpa)
  $('#show-gpa').fadeIn()
}

$('#add-course').click(function () {
  if (i <= 7) {
    let pushRow = `
    <div class="row mt-3 d-flex justify-content-around">
      <div class="col-4">
        <input type="text" class="form-control p-1">
      </div>
      <div class="col-2">
        <input type="number" class="credit form-control p-1" required>
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
  $('#row-course').append(pushRow)
}


$('body').click(function (event) {
  if (event.target.classList.contains('remove')) {
    event.target.parentElement.parentElement.remove()

  }
})