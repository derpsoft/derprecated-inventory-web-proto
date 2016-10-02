<template>
  <section class="content">
  	<div class="container-fluid">
  		<div class="row m-t-sm">
  			<div class="col-md-12">
  				<div class="panel panel-filled">
  					<div class="panel-body">
  						<div class="row">
  							<div class="col-md-6">
  								<div class="media">
  									<i class="pe pe-7s-user c-accent fa-3x"></i>
  									<h2 class="m-t-xs m-b-none">
                      {{ user.firstName }} {{user.LastName }}
  									</h2>
  									<small>
  										There are many variations of passages of Lorem Ipsum available, but the majority
  										have suffered alteration in some form Ipsum available.
  									</small>
  								</div>
  							</div>
  							<div class="col-md-3">
  								<table class="table small m-t-sm">
  									<tbody>
  										<tr>
  											<td>
  												<strong class="c-white">122</strong> Projects
  											</td>
  											<td>
  												<strong class="c-white">42</strong> Active project
  											</td>

  										</tr>
  										<tr>
  											<td>
  												<strong class="c-white">61</strong> Comments
  											</td>
  											<td>
  												<strong class="c-white">84</strong> Articles
  											</td>
  										</tr>
  										<tr>
  											<td>
  												<strong class="c-white">244</strong> Tags
  											</td>
  											<td>
  												<strong class="c-white">42</strong> Friends
  											</td>
  										</tr>
  									</tbody>
  								</table>
  							</div>
  							<div class="col-md-3 m-t-sm">
  								<span class="c-white">
  									Contact with user
  								</span>
  								<br>
  								<small>
  									Lorem Ipsum is simply dummy text of the printing and typesetting industry
  								</small>
  								<div class="btn-group m-t-sm">
  									<a href="#" class="btn btn-default btn-sm"><i class="fa fa-envelope"></i> Contact</a>
  									<a href="#" class="btn btn-default btn-sm"><i class="fa fa-check"></i> Check availability</a>
  								</div>
  							</div>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  		<div class="row">
  			<div class="col-md-6">
  				<div class="panel">
  					<div class="panel-body">
  						<h4> Recent Activity</h4>
  						<div class="v-timeline vertical-container">
  							<div class="vertical-timeline-block">
  								<div class="vertical-timeline-icon">
  									<i class="fa fa-user"></i>
  								</div>
  								<div class="vertical-timeline-content">
  									<div class="p-sm">
  										<span class="vertical-date pull-right"> <small>1 day ago</small> </span>
  										<h2>Update profile</h2>
  										<p>Change profile name and set new profile description</p>
  									</div>
  								</div>
  							</div>
  							<div class="vertical-timeline-block">
  								<div class="vertical-timeline-icon">
  									<i class="fa fa-file"></i>
  								</div>
  								<div class="vertical-timeline-content">
  									<div class="p-sm">
  										<span class="vertical-date pull-right"> <small>2 days ago</small> </span>

  										<h2>Add new documents to X project</h2>

  										<p>Project_document.docx, Contract_20_11_2016.docx, 10_08_2016.docx</p>
  									</div>
  								</div>
  							</div>
  							<div class="vertical-timeline-block">
  								<div class="vertical-timeline-icon">
  									<i class="fa fa-file"></i>
  								</div>
  								<div class="vertical-timeline-content">
  									<div class="p-sm">
  										<span class="vertical-date pull-right"> <small>2 days ago</small> </span>

  										<h2>Contrary to popular belief</h2>

  										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
  										</p>
  									</div>
  								</div>
  							</div>
  							<div class="vertical-timeline-block">
  								<div class="vertical-timeline-icon">
  									<i class="fa fa-calendar"></i>
  								</div>
  								<div class="vertical-timeline-content">
  									<div class="p-sm">
  										<span class="vertical-date pull-right"> <small>4 days ago</small> </span>

  										<h2>The generated Lorem Ipsum</h2>

  										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
  										</p>
  									</div>
  								</div>
  							</div>
  						</div>
  					</div>
  				</div>
  			</div>
  			<div class="col-md-6">
  				<div class="panel">
  					<div class="panel-body">
  						<h4> Project this year</h4>

  						<p class="small">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
  						</p>

  						<div class="flot-chart  m-t-md m-b-xl" style="height: 200px">
  							<div class="flot-chart-content" id="flotProfile"></div>
  						</div>

  						<table class="table table-striped">
  							<thead>
  								<tr>
  									<th>#</th>
  									<th>Project</th>
  									<th>Company</th>
  									<th>Task</th>
  									<th>Date</th>
  									<th>Action</th>
  								</tr>
  							</thead>
  							<tbody>
  								<tr>
  									<td>1</td>
  									<td>Project
  										<small>This is example of project</small>
  									</td>
  									<td>Inceptos Hymenaeos Ltd</td>
  									<td>20%</td>
  									<td>Jul 14, 2016</td>
  									<td class="text-right"><a href="#"><i class="fa fa-edit"></i></a></td>
  								</tr>
  								<tr>
  									<td>2</td>
  									<td>Alpha project</td>
  									<td>Nec Euismod In Company</td>
  									<td>40%</td>
  									<td>Jul 16, 2016</td>
  									<td class="text-right"><a href="#"><i class="fa fa-edit"></i></a></td>
  								</tr>
  								<tr>
  									<td>3</td>
  									<td>Betha project</td>
  									<td>Erat Volutpat</td>
  									<td>75%</td>
  									<td>Jul 18, 2016</td>
  									<td class="text-right"><a href="#"><i class="fa fa-edit"></i></a></td>
  								</tr>
  								<tr>
  									<td>4</td>
  									<td>Gamma project</td>
  									<td>Tellus Ltd</td>
  									<td>18%</td>
  									<td>Jul 22, 2016</td>
  									<td class="text-right"><a href="#"><i class="fa fa-edit"></i></a></td>
  								</tr>
  								<tr>
  									<td>2</td>
  									<td>Alpha project</td>
  									<td>Nec Euismod In Company</td>
  									<td>40%</td>
  									<td>Jul 16, 2016</td>
  									<td class="text-right"><a href="#"><i class="fa fa-edit"></i></a></td>
  								</tr>
  							</tbody>
  						</table>
  					</div>
  				</div>
  			</div>
  		</div>

  		<div class="row">
  			<div class="col-md-12">
  				<div class="panel panel-filled">
  					<div class="panel-body">
  						<div class="row">
  							<div class="col-md-3 col-xs-6 text-center">
  								<h2 class="no-margins">
  									534
  								</h2>
  								<span class="c-white">Commits</span> in last week
  							</div>
  							<div class="col-md-3 col-xs-6 text-center">
  								<h2 class="no-margins">
  									126
  								</h2>
  								<span class="c-white">Public</span> gists
  							</div>
  							<div class="col-md-3 col-xs-6 text-center">
  								<h2 class="no-margins">
  									680
  								</h2>
  								<span class="c-white">New code</span> line
  							</div>
  							<div class="col-md-3 col-xs-6 text-center">
  								<h2 class="no-margins">
  									14
  								</h2>
  								<span class="c-white">New</span> builds
  							</div>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  </section>
</template>

<script>
import Constants from '../../constants.js';
import store from '../../stores/store.js';

export default {
  data() {
    return {
      user: null,
    };
  },
  ready() {
    this.$store.dispatch(Constants.GET_USER);
  },
  computed: {
    user: () => {
      return store.state.session;
    },
  }
};
</script>
