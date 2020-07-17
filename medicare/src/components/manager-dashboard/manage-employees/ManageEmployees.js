import React from 'react';

const ManageEmployees=()=>{
    return (
        <div>
            <a class="manager-head" role="button" data-toggle="collapse" href="#100">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6 col-md-4">
                                <div><b>User Id</b></div>
                                <div>Id</div>
                            </div>
                            <div class="col-6 col-md-4">
                                <div><b>Full Name</b></div>
                                <div>firstName lastName</div>
                            </div>
                            <div class="col-6 col-md-4">
                                <div>
                                    <div class="row">
                                        
                                        <div class="col-6">
                                            <button class="btn btn-link text-danger">
                                                <i class="material-icons">delete_forever</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>


            <div class="collapse multi-collapse manager-body" id="100">
                <div class="card card-body">

                    <div class="row">
                        <div class="col-12 col-md-4 col-lg-3">
                            <div><b>Full Name</b></div>
                            <div>firstName lastName</div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div><b>Age</b></div>
                            <div>age</div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div><b>Gender</b></div>
                            <div>gender</div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div><b>Contact Number</b></div>
                            <div>contact</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageEmployees;