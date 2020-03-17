<?php

namespace App\Controller;

use DateTime;
use Exception;
use App\Entity\Newsletter;
use App\Form\NewsletterType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomepageController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     * @param Request $request
     *
     * @return RedirectResponse|Response
     * @throws Exception
     */
    public function index(Request $request)
    {
        $form = $this->createForm(NewsletterType::class, new Newsletter());
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $form->getData()
                ->setCreatedAt(new DateTime())
                ->setIp($request->getClientIp())
                ->setHostname($request->getHost());

            $this->getDoctrine()->getManager()->persist($form->getData());
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash('success', 'Welcome aboard new buddy! We are sure that you will prove to be a great addition to our team');

            return $this->redirect($this->generateUrl('homepage'));
        }

        return $this->render('homepage/index.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
