<template>
  <section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-filled">
          <div class="panel-heading">
            <div class="panel-tools">
              <a class="panel-toggle"><i class="fa fa-chevron-up"></i></a>
              <a class="panel-close"><i class="fa fa-times"></i></a>
            </div>
            DataTables with HTML4 export buttons
          </div>
          <div class="panel-body">
            <p>
              The Buttons library for DataTables provides a framework with common options and API that can be used with DataTables, but is also very extensible, recognising that you will likely want to use buttons which perform an action unique to your applications.
            </p>
            <div class="table-responsive">

              <table id="tableExample2" class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>60</td>
                    <td>2010/3/24</td>
                    <td>$319,799</td>
                  </tr>
                  <tr>
                    <td>Garrett Winters</td>
                    <td>Accountant</td>
                    <td>Tokyo</td>
                    <td>62</td>
                    <td>2010/6/24</td>
                    <td>$169,749</td>
                  </tr>
                  <tr>
                    <td>Ashton Cox</td>
                    <td>Junior Technical Author</td>
                    <td>San Francisco</td>
                    <td>65</td>
                    <td>2008/0/11</td>
                    <td>$85,-1</td>
                  </tr>
                  <tr>
                    <td>Cedric Kelly</td>
                    <td>Senior Javascript Developer</td>
                    <td>Edinburgh</td>
                    <td>21</td>
                    <td>2011/2/28</td>
                    <td>$432,59</td>
                  </tr>
                  <tr>
                    <td>Airi Satou</td>
                    <td>Accountant</td>
                    <td>Tokyo</td>
                    <td>32</td>
                    <td>2007/10/27</td>
                    <td>$161,699</td>
                  </tr>
                  <tr>
                    <td>Brielle Williamson</td>
                    <td>Integration Specialist</td>
                    <td>New York</td>
                    <td>60</td>
                    <td>2011/11/1</td>
                    <td>$371,-1</td>
                  </tr>
                  <tr>
                    <td>Herrod Chandler</td>
                    <td>Sales Assistant</td>
                    <td>San Francisco</td>
                    <td>58</td>
                    <td>2011/7/5</td>
                    <td>$136,499</td>
                  </tr>
                  <tr>
                    <td>Rhona Davidson</td>
                    <td>Integration Specialist</td>
                    <td>Tokyo</td>
                    <td>54</td>
                    <td>2009/9/13</td>
                    <td>$326,899</td>
                  </tr>
                  <tr>
                    <td>Colleen Hurst</td>
                    <td>Javascript Developer</td>
                    <td>San Francisco</td>
                    <td>38</td>
                    <td>2008/8/14</td>
                    <td>$204,499</td>
                  </tr>
                  <tr>
                    <td>Sonya Frost</td>
                    <td>Software Engineer</td>
                    <td>Edinburgh</td>
                    <td>22</td>
                    <td>2007/11/12</td>
                    <td>$102,599</td>
                  </tr>
                  <tr>
                    <td>Brenden Wagner</td>
                    <td>Software Engineer</td>
                    <td>San Francisco</td>
                    <td>27</td>
                    <td>2010/5/6</td>
                    <td>$205,849</td>
                  </tr>
                  <tr>
                    <td>Fiona Green</td>
                    <td>Chief Operating Officer (COO)</td>
                    <td>San Francisco</td>
                    <td>47</td>
                    <td>2009/2/10</td>
                    <td>$849,-1</td>
                  </tr>
                  <tr>
                    <td>Shou Itou</td>
                    <td>Regional Marketing</td>
                    <td>Tokyo</td>
                    <td>19</td>
                    <td>2010/7/13</td>
                    <td>$162,-1</td>
                  </tr>
                  <tr>
                    <td>Michelle House</td>
                    <td>Integration Specialist</td>
                    <td>Sidney</td>
                    <td>36</td>
                    <td>2010/5/1</td>
                    <td>$94,399</td>
                  </tr>
                  <tr>
                    <td>Suki Burks</td>
                    <td>Developer</td>
                    <td>London</td>
                    <td>52</td>
                    <td>2008/9/21</td>
                    <td>$113,499</td>
                  </tr>
                  <tr>
                    <td>Prescott Bartlett</td>
                    <td>Technical Author</td>
                    <td>London</td>
                    <td>26</td>
                    <td>2010/4/6</td>
                    <td>$144,-1</td>
                  </tr>
                  <tr>
                    <td>Gavin Cortez</td>
                    <td>Team Leader</td>
                    <td>San Francisco</td>
                    <td>21</td>
                    <td>2007/9/25</td>
                    <td>$234,499</td>
                  </tr>
                  <tr>
                    <td>Martena Mccray</td>
                    <td>Post-Sales support</td>
                    <td>Edinburgh</td>
                    <td>45</td>
                    <td>2010/2/8</td>
                    <td>$323,49</td>
                  </tr>
                  <tr>
                    <td>Unity Butler</td>
                    <td>Marketing Designer</td>
                    <td>San Francisco</td>
                    <td>46</td>
                    <td>2008/11/8</td>
                    <td>$84,674</td>
                  </tr>
                  <tr>
                    <td>Howard Hatfield</td>
                    <td>Office Manager</td>
                    <td>San Francisco</td>
                    <td>50</td>
                    <td>2007/11/15</td>
                    <td>$163,499</td>
                  </tr>
                  <tr>
                    <td>Hope Fuentes</td>
                    <td>Secretary</td>
                    <td>San Francisco</td>
                    <td>40</td>
                    <td>2009/1/11</td>
                    <td>$108,849</td>
                  </tr>
                  <tr>
                    <td>Vivian Harrell</td>
                    <td>Financial Controller</td>
                    <td>San Francisco</td>
                    <td>61</td>
                    <td>2008/1/13</td>
                    <td>$451,499</td>
                  </tr>
                  <tr>
                    <td>Timothy Mooney</td>
                    <td>Office Manager</td>
                    <td>London</td>
                    <td>36</td>
                    <td>2007/11/10</td>
                    <td>$135,199</td>
                  </tr>
                  <tr>
                    <td>Jackson Bradshaw</td>
                    <td>Director</td>
                    <td>New York</td>
                    <td>64</td>
                    <td>2007/8/25</td>
                    <td>$644,749</td>
                  </tr>
                  <tr>
                    <td>Olivia Liang</td>
                    <td>Support Engineer</td>
                    <td>Singapore</td>
                    <td>63</td>
                    <td>2010/1/2</td>
                    <td>$233,499</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</section>
 </template>


<script>
  export default {
  };
</script>
