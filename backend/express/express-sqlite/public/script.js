const tb = `
  <% if(nameData.length!=0){
      nameData.forEach(function(data){
  %>
    <tr>
        <td><%=data["name_id"] %></td>
        <td><%=data["name"] %></td>
        <td>
            <a class="editName"  onclick="editClick(<%=data["name_id"]%>)"> <img src="images/edit.svg" style="width: 30px" fill="#fff"> </a>
            <a onclick="deleteClick(<%=data["name_id"]%>)"><img src="images/remove.svg" style="width: 30px"></a>
        </td>
    </tr>

  <% })} else { %>
    <tr>
        <td colspan="2">No Data Found</td>
    </tr>
  <% } %>
`;

$(document).ready(function () {
 


  $("#addname").click(function () {
   
    var formData = JSON.stringify({
      name: document.getElementById("txtname").value,
    });
    $.ajax({
      type: "POST",
      url: "/name/add",
      async: false,
      data: formData,

      contentType: "application/json",
    })
      .done(function (object) {
        html = ejs.render(tb, { nameData: object });
        $("#nameBody").html(html);
         document.getElementById("txtname").value="";
        //console.log(object);
        //alert(object);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        //alert("Failed: " + errorThrown);
      })
      .always(function (a, textStatus, b) {
        //alert("Final status: " + textStatus);
      });

    console.log("ok");
  });
  // $(".editName").click(function (msg) {
  //  console.log(msg)
  //   var person = prompt("Nhập tên: ", "");
  //   if (person != null) {
  //     var formData = JSON.stringify({
  //       name: document.getElementById("txtname").value,
  //     });
  //   }
  // });
});
function editClick(msg) {
  console.log(msg);
  var person = prompt("Nhập tên: ", "");
  if (person != null) {
    var formData = JSON.stringify({
      name: person,
    });
    $.ajax({
      type: "PUT",
      url: "/name/edit/" + msg,
      async: false,
      data: formData,

      contentType: "application/json",
    })
      .done(function (object) {
        html = ejs.render(tb, { nameData: object });
        $("#nameBody").html(html);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        //alert("Failed: " + errorThrown);
      })
      .always(function (a, textStatus, b) {
        //alert("Final status: " + textStatus);
      });
  }
}
function deleteClick(msg) {
  console.log(msg);

    $.ajax({
      type: "DELETE",
      url: "/name/delete/" + msg,
      async: false,
    })
      .done(function (object) {
        html = ejs.render(tb, { nameData: object });
        $("#nameBody").html(html);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        //alert("Failed: " + errorThrown);
      })
      .always(function (a, textStatus, b) {
        //alert("Final status: " + textStatus);
      });
  
}
function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  console.log(filter)
  table = document.getElementById("nameBody");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function myAdd() {
  // Declare variables
  document.querySelector("#addname").disabled = true;
  var input, filter, table, tr, td, i;
  input = document.getElementById("txtname");
  filter = input.value.toUpperCase();
  console.log(filter);
  table = document.getElementById("nameBody");
  tr = table.getElementsByTagName("tr");
  var check = true;
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        check = false;
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  if(check){
    document.querySelector("#addname").disabled = false;
  }
}
// function idSort(){
//    sortTable(0);
// }
// function nameSort(){
// sortTable(1);
// }

// function sortTable(n) {
//   var table,
//     rows,
//     switching,
//     i,
//     x,
//     y,
//     shouldSwitch,
//     dir,
//     switchcount = 0;
//   table = document.getElementById("nameBody");
//   switching = true;
//   //Set the sorting direction to ascending:
//   dir = "asc";
//   /*Make a loop that will continue until
//   no switching has been done:*/
//   while (switching) {
//     //start by saying: no switching is done:
//     switching = false;
//     rows = table.rows;
//     /*Loop through all table rows (except the
//     first, which contains table headers):*/
//     for (i = 1; i < rows.length - 1; i++) {
//       //start by saying there should be no switching:
//       shouldSwitch = false;
//       /*Get the two elements you want to compare,
//       one from current row and one from the next:*/
//       x = rows[i].getElementsByTagName("TD")[n];
//       y = rows[i + 1].getElementsByTagName("TD")[n];
//       /*check if the two rows should switch place,
//       based on the direction, asc or desc:*/
//       if (dir == "asc") {
//         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//           //if so, mark as a switch and break the loop:
//           shouldSwitch = true;
//           break;
//         }
//       } else if (dir == "desc") {
//         if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//           //if so, mark as a switch and break the loop:
//           shouldSwitch = true;
//           break;
//         }
//       }
//     }
//     if (shouldSwitch) {
//       /*If a switch has been marked, make the switch
//       and mark that a switch has been done:*/
//       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//       switching = true;
//       //Each time a switch is done, increase this count by 1:
//       switchcount++;
//     } else {
//       /*If no switching has been done AND the direction is "asc",
//       set the direction to "desc" and run the while loop again.*/
//       if (switchcount == 0 && dir == "asc") {
//         dir = "desc";
//         switching = true;
//       }
//     }
//   }
// }