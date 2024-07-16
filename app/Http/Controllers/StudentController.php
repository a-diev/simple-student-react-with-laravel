<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Student $model)
    {
        $students = $model->all()->map(function (Student $s) {
            return [
                'id' => $s->id,
                'firstName' => $s->first_name,
                'lastName' => $s->last_name,
                'email' => $s->email,
            ];
        });

        return Inertia::render('Student', [
            'students' => $students,
            'count' => $model->count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {

    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Student $model)
    {
        $validate = $request->validate([
            'first_name' => 'required|max:255|min:2',
            'last_name' => 'required|max:255|min:2',
            'email' => 'required|email|max:255|unique:students,email',
        ]);

        $model->create($validate);

        return back()->with('message', 'Student added successfully');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Student $student)
    // {

    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Student $student)
    // {

    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student, $student_id)
    {
        $validate = $request->validate(
            [
                'first_name' => 'required|max:255|min:2',
                'last_name' => 'required|max:255|min:2',
                'email' => 'required|email|max:255',
            ],
            [
                'email.unique' => 'The email has already been taken.',
            ]
        );

        $studentExist = $student->findOrFail($student_id);

        $studentExist->update($validate);

        return back()->with('message', 'Student updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student, $student_id)
    {
        $studentExist = $student->findOrFail($student_id);

        $studentExist->delete();

        return back()->with('message', 'Student deleted successfully');
    }
}
